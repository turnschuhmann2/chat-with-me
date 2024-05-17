"use client";

import type { Prompt } from "@/server/db/schema";

import { useConversationContext } from "../providers/conversation-provider";
import clsx from "clsx";

export default function PromptCard(props: { prompt: Prompt }) {
  const { postPrompt, waitingForResponse } = useConversationContext();

  const handlePromptCardClick = () => {
    if (!waitingForResponse) {
      return postPrompt(props.prompt);
    }
  };

  return (
    <div
      className={clsx(
        "cursor-pointer rounded-xl bg-default px-3 py-2 text-defaultContent shadow-2xl duration-300 hover:bg-defaultHover md:h-16",
        waitingForResponse &&
          "cursor-default bg-defaultDisabled hover:bg-defaultDisabled",
      )}
      onClick={handlePromptCardClick}
    >
      {props.prompt.content}
    </div>
  );
}
