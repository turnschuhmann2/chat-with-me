"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useConversationContext } from "../_providers/ConversationProvider";

import type { Bubble } from "../_providers/ConversationProvider";

export default function ConversationContainer() {
  const { chatBubbles } = useConversationContext() ?? { chatBubbles: [] };

  return (
    <div className="flex h-full w-full flex-col justify-start gap-3 pt-4">
      {chatBubbles.map((bubble: Bubble) =>
        bubble.orientation === "left" ? (
          <div
            key={bubble.position}
            className="flex w-full flex-row justify-start gap-2"
          >
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="rounded-xl rounded-tl-none bg-white p-4 text-black">
              {bubble.content}
            </div>
          </div>
        ) : (
          <div
            key={bubble.position}
            className="flex w-full flex-row justify-end gap-2"
          >
            <div className="rounded-xl rounded-tr-none bg-white p-4 text-black">
              {bubble.content}
            </div>

            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        ),
      )}
    </div>
  );
}
