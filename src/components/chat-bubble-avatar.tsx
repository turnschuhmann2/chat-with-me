"use client";

import {
  Avatar as AvatarComponent,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import type { Avatar } from "@/server/db/schema";

export default function ChatBubbleAvatar(props: { avatar: Avatar }) {
  return (
    <AvatarComponent className="size-8 md:size-10">
      <AvatarImage src={props.avatar.fileUrl} />
      <AvatarFallback>CN</AvatarFallback>
    </AvatarComponent>
  );
}
