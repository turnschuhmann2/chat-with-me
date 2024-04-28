"use client";

import type { Prompt } from "~/server/db/schema";

import { createContext, useContext, useState } from "react";

import { generateId, getRandomInt, timeout } from "~/util/common";

export interface BubbleInterface {
  id: string;
  content?: string;
  type: "prompt" | "response";
  loading?: boolean;
}

interface ConversationContextInterface {
  chatBubbles: BubbleInterface[];
  postPrompt: (prompt: Prompt) => Promise<void>;
  setChatBubbles: React.Dispatch<React.SetStateAction<BubbleInterface[]>>;
}

export const ConversationContext = createContext<ConversationContextInterface>(
  {} as ConversationContextInterface,
);

export function useConversationContext() {
  return useContext(ConversationContext);
}

export default function ConversationProvider({ children }) {
  const [chatBubbles, setChatBubbles] = useState<BubbleInterface[]>([]);

  const postPrompt = async (prompt: Prompt) => {
    const promptBubble: BubbleInterface = {
      id: generateId(),
      content: prompt.content,
      type: "prompt",
    };

    setChatBubbles(prev => [...prev, promptBubble]);

    await timeout(500);

    const loadingBubbleId = generateId();

    const loadingBubble: BubbleInterface = {
      id: loadingBubbleId,
      loading: true,
      type: "response",
    };

    setChatBubbles(prev => [...prev, loadingBubble]);

    const randomDelay = getRandomInt(1000, 2000);

    await timeout(randomDelay);

    setChatBubbles(prev =>
      prev.filter(bubble => bubble.id !== loadingBubbleId),
    );

    await timeout(1000);

    const responseBubble: BubbleInterface = {
      id: generateId(),
      content: prompt.responses[0]?.content ?? "No response found.",
      type: "response",
    };

    setChatBubbles(prev => [...prev, responseBubble]);
  };

  return (
    <ConversationContext.Provider
      value={{ chatBubbles, postPrompt, setChatBubbles }}
    >
      {children}
    </ConversationContext.Provider>
  );
}
