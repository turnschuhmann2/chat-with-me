"use client";

import { createContext, useContext, useState } from "react";

export type Bubble = {
  position: number;
  content: string;
  orientation: "left" | "right";
};

export const ConversationContext = createContext<
  | {
      chatBubbles: Bubble[];
      addBubbles: (bubble: Bubble[]) => void;
    }
  | undefined
>(undefined);

export default function ConversationProvider({ children }) {
  const [chatBubbles, setChatBubbles] = useState<Bubble[]>([]);

  const addBubbles = (bubbles: Bubble[]) => {
    setChatBubbles(prev => [...prev, ...bubbles]);
  };

  return (
    <ConversationContext.Provider value={{ chatBubbles, addBubbles }}>
      {children}
    </ConversationContext.Provider>
  );
}

export function useConversationContext() {
  return useContext(ConversationContext);
}
