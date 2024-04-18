import { db } from "~/server/db";

import SearchBar from "./search-bar";
import PromptCard from "./prompt-card";

export const dynamic = "force-dynamic";

export default async function PromptInputBar(props: {
  searchParams?: { query?: string; page?: string };
}) {
  const prompts = await db.query.prompts.findMany({
    where: (prompts, { like }) =>
      props.searchParams?.query
        ? like(prompts.content, `%${props.searchParams.query}%`)
        : undefined,
    orderBy: (prompts, { asc }) => [asc(prompts.relevance)],
    with: {
      responses: true,
    },
  });

  return (
    <div className="flex w-full flex-col justify-between gap-3 rounded-3xl bg-white px-5 pb-6 pt-3 text-black">
      <SearchBar />

      <div className="flex flex-row flex-wrap gap-3">
        {prompts?.length ? (
          prompts.map(prompt => <PromptCard key={prompt.id} prompt={prompt} />)
        ) : (
          <div className="text-gray-500">No prompts found.</div>
        )}
      </div>
    </div>
  );
}
