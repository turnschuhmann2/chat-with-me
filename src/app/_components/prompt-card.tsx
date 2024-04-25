"use client";

import type { Prompt } from "server/db/schema";

import { useConversationContext } from "../_providers/ConversationProvider";

export default function PromptCard(props: { prompt: Prompt }) {
  const { postPrompt } = useConversationContext();

  const handlePromptCardClick = () => postPrompt(props.prompt);

  return (
    <div
      className="flex flex-row flex-wrap gap-3"
      onClick={handlePromptCardClick}
    >
      <div className="h-16 rounded-xl px-3 py-2 shadow-lg hover:bg-slate-200">
        {props.prompt.content}
      </div>
    </div>
  );
}
