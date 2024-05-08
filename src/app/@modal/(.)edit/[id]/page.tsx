import { revalidatePath } from "next/cache";
import { Modal } from "./modal";

import { FloppyDisk, Plus, Trash } from "@phosphor-icons/react/dist/ssr";

import {
  createResponse,
  deleteResponse,
  updatePromptContent,
  updateResponseContent,
} from "@/server/db/mutations";
import { getSinglePrompt } from "@/server/db/queries";

export default async function PromptModal({
  params: { id: promptId },
}: {
  params: { id: number };
}) {
  const prompt = await getSinglePrompt(promptId);

  return (
    <Modal>
      <div className="flex size-full flex-col gap-4 rounded-lg bg-default p-6">
        <form
          className="flex w-2/3 flex-row justify-between gap-6 rounded-md bg-primary p-4 text-primaryContent"
          action={async formData => {
            "use server";

            const content = formData.get("content")?.toString();

            await updatePromptContent(promptId, content);

            revalidatePath(`/edit`);
          }}
        >
          <input
            type="text"
            name="content"
            defaultValue={prompt?.content}
            className="w-full bg-transparent"
          />
          <button type="submit">
            <FloppyDisk size={"1.5rem"} />
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

                await updateResponseContent(response.id, content);

                revalidatePath(`/edit`);
              }}
            >
              <FloppyDisk size={"1.5rem"} />
            </button>
            <button
              type="submit"
              formAction={async () => {
                "use server";

                await deleteResponse(response.id);

                revalidatePath(`/edit`);
              }}
            >
              <Trash size={"1.5rem"} />
            </button>
          </form>
        ))}
        <div className="flex flex-row justify-end">
          <form
            className="rounded-md bg-accent text-accentContent"
            action={async () => {
              "use server";

              await createResponse(promptId, "My new response");

              revalidatePath(`/edit`);
            }}
          >
            <button
              type="submit"
              className="flex items-center justify-center p-3"
            >
              <Plus size={"1.5rem"} />
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
}
