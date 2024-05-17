"use client";

import {
  Avatar as AvatarComponent,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import GuestAvatar from "@/components/guest-avatar";

import {
  useConversationContext,
  type MessageType,
} from "@/providers/conversation-provider";

import type { Avatar } from "@/server/db/schema";

export default function ChatBubbleAvatar(props: {
  avatar: Avatar;
  messageType: MessageType;
}) {
  const { userImageUrl } = useConversationContext();

  return (
    <AvatarComponent className="size-8 md:size-10">
      <AvatarImage
        src={
          props.messageType === "response" ? props.avatar.fileUrl : userImageUrl
        }
      />
      <AvatarFallback>
        <GuestAvatar />
      </AvatarFallback>
    </AvatarComponent>
  );
}
