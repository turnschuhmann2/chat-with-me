"use client";

import {
  Avatar as AvatarComponent,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import type { Avatar } from "@/server/db/schema";

import {
  useConversationContext,
  type MessageType,
} from "@/providers/conversation-provider";

export default function ChatBubbleAvatar(props: {
  avatar: Avatar;
  messageType: MessageType;
}) {
  const { userImageUrl } = useConversationContext();

  return (
    <AvatarComponent className="size-8 md:size-10">
      <AvatarImage
        src={
          props.messageType === "prompt" ? userImageUrl : props.avatar.fileUrl
        }
      />
      <AvatarFallback>CN</AvatarFallback>
    </AvatarComponent>
  );
}
