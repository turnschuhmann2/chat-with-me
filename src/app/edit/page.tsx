import Link from "next/link";
import { revalidatePath } from "next/cache";

import { eq } from "drizzle-orm";
import { env } from "process";

import { db } from "@/server/db";
import { prompts, responses } from "@/server/db/schema";

export const dynamic = "force-dynamic";

export default async function EditPage() {
  // for now, allow editing in development of prompts in dev only
  const allowEdit = env.NODE_ENV === "development";

  const allPrompts = await db.query.prompts.findMany({
    orderBy: (prompts, { asc }) => [asc(prompts.relevance)],
  });

  return (
    allowEdit && (
      <main className="gradient-background flex h-screen min-h-screen flex-row items-center justify-center">
        <div className="container flex h-full flex-row items-center justify-between gap-8 px-2 py-2 md:px-8 md:py-12 ">
          <div className="flex size-full flex-col gap-3 rounded-3xl bg-darkTransparent50 p-2 pb-5 md:gap-6 md:p-6 md:pb-8">
            {allPrompts?.map(prompt => (
              <div
                key={prompt.id}
                className="flex flex-row items-center justify-between gap-6 rounded-xl bg-primary text-primaryContent"
              >
                <Link href={`/edit/${prompt.id}`} className=" size-full p-4">
                  {prompt.content}
                </Link>

                <form
                  action={async () => {
                    "use server";

                    await db
                      .delete(responses)
                      .where(eq(responses.promptId, prompt.id));

                    await db.delete(prompts).where(eq(prompts.id, prompt.id));

                    revalidatePath(`/edit`);
                  }}
                >
                  <button
                    type="submit"
                    className="flex h-12 w-12 items-center justify-center"
                  >
                    <div className="material-symbols-rounded">Delete</div>
                  </button>
                </form>
              </div>
            ))}
            <div className="flex flex-row justify-end">
              <form
                className="rounded-md bg-accent text-accentContent"
                action={async () => {
                  "use server";

                  const newPromptId = await db
                    .insert(prompts)
                    .values({
                      content: "my new prompt",
                    })
                    .returning({ id: prompts.id });

                  revalidatePath(`/edit`);
                  // TODO implement redirect for modal
                  // redirect(`/edit/${newPromptId[0]?.id}`);
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
        </div>
      </main>
    )
  );
}
