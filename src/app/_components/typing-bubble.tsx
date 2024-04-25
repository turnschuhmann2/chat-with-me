"use client";

import * as React from "react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 0, opacity: 0.2 },
  visible: {
    y: [0, 2, 0],
    opacity: 1,
    transition: {
      repeat: Infinity,
      duration: 1.2,
      times: [0, 0.3, 0.6],
    },
  },
};

export default function TypingBubble() {
  return (
    <motion.div
      className="flex flex-row gap-2 p-2"
      variants={container}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {[0, 1, 2].map(index => (
        <motion.div
          key={index}
          className="size-4 rounded-full bg-white"
          variants={item}
        />
      ))}
    </motion.div>
  );
}
