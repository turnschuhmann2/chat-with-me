import PromptCard from "./prompt-card";
import SearchBar from "./search-bar";

import { searchPrompts } from "@/server/db/queries";

export const dynamic = "force-dynamic";

export default async function PromptInputBar(props: {
  searchParams?: { query?: string; page?: string };
}) {
  const prompts = await searchPrompts(props.searchParams?.query);

  return (
    <div className="flex w-full flex-col justify-start gap-4">
      <SearchBar />

      <div className="scroll-gutter flex h-[15vh] scroll-m-4 flex-row flex-wrap content-start gap-2 overflow-y-auto px-2 md:gap-4">
        {prompts?.length ? (
          prompts.map(prompt => <PromptCard key={prompt.id} prompt={prompt} />)
        ) : (
          <div className="text-white">No prompts found.</div>
        )}
      </div>
    </div>
  );
}
