"use client";

import type { BubbleInterface } from "../providers/conversation-provider";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useConversationContext } from "../providers/conversation-provider";
import { AnimatePresence, motion } from "framer-motion";
import { clsx } from "clsx";
import TypingBubble from "./typing-bubble";

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

export default function ConversationContainer() {
  const { chatBubbles } = useConversationContext();

  return (
    <motion.div
      layout
      transition={{ duration: 0.2 }}
      className="flex h-full w-full flex-col justify-end gap-3 overflow-y-hidden"
    >
      <AnimatePresence initial={false}>
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
            <Avatar className="size-8 md:size-10">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div
              className={clsx(
                " rounded-xl",
                bubble.type === "response"
                  ? "rounded-tl-none bg-secondary text-secondaryContent"
                  : "rounded-tr-none bg-primary text-primaryContent",
                bubble.loading ? "p-3" : "p-4",
              )}
            >
              {bubble.loading ? (
                <TypingBubble key="loading" />
              ) : (
                <div key="text" className="flex">
                  {bubble.content}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}