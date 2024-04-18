"use client";

import type { Bubble } from "../_providers/ConversationProvider";
import type { Prompt } from "~/server/db/schema";

import { useConversationContext } from "../_providers/ConversationProvider";

export default function PromptCard(props: { prompt: Prompt }) {
  const { chatBubbles, addBubbles } = useConversationContext() ?? {};

  const handlePromptCardClick = () => {
    const position = chatBubbles?.length ?? 0;

    const promptBubble: Bubble = {
      position,
      content: props.prompt.content,
      orientation: "left",
    };

    const responseBubble: Bubble = {
      position: position + 1,
      content: props.prompt.responses?.[0]?.content ?? "No response found.",
      orientation: "right",
    };

    addBubbles!([promptBubble, responseBubble]);
  };

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
