import ChatContainer from "~/components/chat";
import PromptInputBar from "@/components/prompt-input";

import ChatProvider from "@/providers/chat-provider";

import { getSingleAvatar } from "@/server/db/queries";

import { currentUser } from "@clerk/nextjs/server";

export default async function ChatPage(props: {
  searchParams?: { query?: string; page?: string };
}) {
  const responseAvatar = await getSingleAvatar(2);

  const user = await currentUser();

  return (
    <ChatProvider userImageUrl={user?.imageUrl}>
      <ChatContainer avatar={responseAvatar!} />

      <div className="h-[1px] bg-tertiary" />

      <PromptInputBar searchParams={props.searchParams} />
    </ChatProvider>
  );
}
