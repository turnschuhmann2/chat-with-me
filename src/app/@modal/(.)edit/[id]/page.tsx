import { eq } from "drizzle-orm";

import { db } from "@/server/db";
import { prompts, responses } from "@/server/db/schema";

import { Modal } from "./modal";
import { revalidatePath } from "next/cache";

export default async function PromptModal({
  params: { id: promptId },
}: {
  params: { id: number };
}) {
  const prompt = await db.query.prompts.findFirst({
    where: eq(prompts.id, promptId),
    orderBy: (prompts, { asc }) => [asc(prompts.relevance)],
    with: {
      responses: true,
    },
  });

  return (
    <Modal>
      <div className="flex size-full flex-col gap-4 rounded-lg bg-default p-6">
        <form
          className="flex w-2/3 flex-row justify-between gap-6 rounded-md bg-primary p-4 text-primaryContent"
          action={async formData => {
            "use server";

            const content = formData.get("content")?.toString();

            await db
              .update(prompts)
              .set({ content })
              .where(eq(prompts.id, promptId));

            revalidatePath(`/edit`);
          }}
        >
          <input
            type="text"
            name="content"
            defaultValue={prompt?.content}
            className="w-full bg-transparent"
          />
          <button type="submit" className="material-symbols-rounded">
            Save
          </button>
        </form>

        {prompt?.responses.map(response => (
          <form
            key={response.id}
            className="flex flex-row justify-between gap-6 rounded-md bg-secondary p-4 text-secondaryContent"
          >
            <textarea
              name="content"
              defaultValue={response.content ?? ""}
              className="w-full bg-transparent"
              rows={3}
            />
            <button
              type="submit"
              formAction={async formData => {
                "use server";

                const content = formData.get("content")?.toString();

                await db
                  .update(responses)
                  .set({ content })
                  .where(eq(responses.id, response.id));

                revalidatePath(`/edit`);
              }}
              className="material-symbols-rounded"
            >
              Save
            </button>
            <button
              type="submit"
              formAction={async () => {
                "use server";

                await db.delete(responses).where(eq(responses.id, response.id));

                revalidatePath(`/edit`);
              }}
              className="material-symbols-rounded"
            >
              Delete
            </button>
          </form>
        ))}
        <div className="flex flex-row justify-end">
          <form
            className="rounded-md bg-accent text-accentContent"
            action={async () => {
              "use server";

              await db.insert(responses).values({
                content: "my new response",
                promptId,
              });

              revalidatePath(`/edit`);
            }}
          >
            <button
              type="submit"
              className="flex h-12 w-12 items-center justify-center"
            >
              <div className="material-symbols-rounded">Add</div>
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
}
