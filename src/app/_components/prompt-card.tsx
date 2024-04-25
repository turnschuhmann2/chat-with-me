"use client";

import type { Prompt } from "server/db/schema";

import { useConversationContext } from "../_providers/ConversationProvider";

export default function PromptCard(props: { prompt: Prompt }) {
  const { postPrompt } = useConversationContext();

  const handlePromptCardClick = () => postPrompt(props.prompt);

  return (
    <div
      onClick={handlePromptCardClick}
      className="bg-default hover:bg-defaultHover text-defaultContent h-16 rounded-xl px-3 py-2 shadow-xl"
    >
      {props.prompt.content}
    </div>
  );
}
