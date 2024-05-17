"use client";

import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { clsx } from "clsx";

import type { Avatar } from "@/server/db/schema";

import type { BubbleInterface } from "@/providers/chat-provider";
import { useChatContext } from "@/providers/chat-provider";

import TypingBubble from "./typing-bubble";
import ChatBubbleAvatar from "./chat-bubble-avatar";

const container = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 1,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
    scale: 1,
  },
};

export default function ChatContainer(props: { avatar: Avatar }) {
  const { chatBubbles } = useChatContext();

  const ref = useRef(null);

  // const scrollToBottom = () => {
  //   (ref.current! as HTMLElement).scrollIntoView({ behavior: "smooth" });
  // };

  // useEffect(() => {
  //   scrollToBottom();
  // });

  return (
    <motion.div
      layout
      transition={{ duration: 0.2 }}
      className="scroll-gutter flex h-full w-full flex-col-reverse gap-3 overflow-y-auto p-2"
    >
      <AnimatePresence initial={false}>
        <div ref={ref} />
        {chatBubbles.map((bubble: BubbleInterface) => (
          <motion.div
            layout
            key={bubble.id}
            className={clsx(
              " flex w-full justify-start gap-2",
              bubble.type === "response" ? "flex-row " : "flex-row-reverse ",
            )}
            variants={container}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <ChatBubbleAvatar avatar={props.avatar} messageType={bubble.type} />

            <div
              className={clsx(
                "max-w-[75%] xl:max-w-[60%]",
                "rounded-xl",
                bubble.type === "response"
                  ? "rounded-tl-none bg-secondary text-secondaryContent"
                  : "rounded-tr-none bg-primary text-primaryContent",
                bubble.loading ? "p-3" : "p-4",
              )}
            >
              {bubble.loading ? (
                <TypingBubble key="loading" />
              ) : (
                <p className="break-normal">{bubble.content}</p>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
