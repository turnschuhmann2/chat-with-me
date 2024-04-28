"use client";

import type { Prompt } from "server/db/schema";

import { useConversationContext } from "../_providers/ConversationProvider";

export default function PromptCard(props: { prompt: Prompt }) {
  const { postPrompt } = useConversationContext();

  const handlePromptCardClick = () => postPrompt(props.prompt);

  return (
    <div
      onClick={handlePromptCardClick}
      className="rounded-xl bg-default px-3 py-2 text-defaultContent shadow-xl hover:bg-defaultHover md:h-16"
    >
      {props.prompt.content}
    </div>
  );
}
