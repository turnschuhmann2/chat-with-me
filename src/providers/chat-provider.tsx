"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import type { Prompt } from "@/server/db/schema";
import { generateId, timeout } from "@/util/common";

export type MessageType = "prompt" | "response";

export interface BubbleInterface {
  id: string;
  content?: string;
  type: "prompt" | "response";
  loading?: boolean;
}

interface ChatContextInterface {
  chatBubbles: BubbleInterface[];
  postPrompt: (prompt: Prompt) => Promise<void>;
  setChatBubbles: React.Dispatch<React.SetStateAction<BubbleInterface[]>>;
  waitingForResponse: boolean;
  userImageUrl?: string;
}

export const ChatContext = createContext<ChatContextInterface>(
  {} as ChatContextInterface,
);

export function useChatContext() {
  return useContext(ChatContext);
}

export default function ChatProvider(props: {
  userImageUrl?: string;
  children: React.ReactNode;
}) {
  const [chatBubbles, setChatBubbles] = useState<BubbleInterface[]>([]);
  const [waitingForResponse, setWaitingForResponse] = useState(false);

  const postPrompt = useCallback(async (prompt: Prompt) => {
    const promptBubble: BubbleInterface = {
      id: generateId(),
      content: prompt.content,
      type: "prompt",
    };

    setChatBubbles(prev => [promptBubble, ...prev]);
    setWaitingForResponse(true);

    await timeout(500);

    const loadingBubbleId = generateId();

    const loadingBubble: BubbleInterface = {
      id: loadingBubbleId,
      loading: true,
      type: "response",
    };

    setChatBubbles(prev => [loadingBubble, ...prev]);

    const responseLength = prompt.responses[0]?.content?.length;

    if (!responseLength) {
      return;
    }

    const delay = 1000 + responseLength * 2;

    await timeout(delay);

    setChatBubbles(prev =>
      prev.filter(bubble => bubble.id !== loadingBubbleId),
    );

    await timeout(1000);

    const responseBubble: BubbleInterface = {
      id: generateId(),
      content: prompt.responses[0]?.content ?? "No response found.",
      type: "response",
    };

    setChatBubbles(prev => [responseBubble, ...prev]);
    setWaitingForResponse(false);
  }, []);

  const contextValue = useMemo(
    () => ({
      chatBubbles,
      postPrompt,
      setChatBubbles,
      waitingForResponse,
      userImageUrl: props.userImageUrl,
    }),
    [chatBubbles, postPrompt, waitingForResponse, props.userImageUrl],
  );

  return (
    <ChatContext.Provider value={contextValue}>
      {props.children}
    </ChatContext.Provider>
  );
}
