"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import type { Prompt } from "@/server/db/schema";
import { theme } from "@/styles/theme";

import { useConversationContext } from "../providers/conversation-provider";

export default function PromptCard(props: { prompt: Prompt }) {
  const { postPrompt, waitingForResponse } = useConversationContext();

  const [isHovered, _setIsHovered] = useState(false);

  const setIsHovered = (value: boolean) => () => _setIsHovered(value);

  const handlePromptCardClick = () => {
    if (!waitingForResponse) {
      return postPrompt(props.prompt);
    }
  };

  const getBackgroundColor = () => {
    if (waitingForResponse) {
      return theme.colors.defaultDisabled;
    } else if (isHovered) {
      return theme.colors.defaultHover;
    } else {
      return theme.colors.default;
    }
  };

  return (
    <motion.div
      className={"rounded-xl px-3 py-2 text-defaultContent shadow-xl  md:h-16"}
      onClick={handlePromptCardClick}
      onHoverStart={setIsHovered(true)}
      onHoverEnd={setIsHovered(false)}
      initial={{ backgroundColor: theme.colors.default }}
      animate={{ backgroundColor: getBackgroundColor() }}
      transition={{ duration: 0.3 }}
    >
      {props.prompt.content}
    </motion.div>
  );
}
