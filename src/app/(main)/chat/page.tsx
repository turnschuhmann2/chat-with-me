import ConversationContainer from "@/components/conversation-container";
import PromptInputBar from "@/components/prompt-input-bar";

import ConversationProvider from "@/providers/conversation-provider";

import { getSingleAvatar } from "@/server/db/queries";

import { User, currentUser } from "@clerk/nextjs/server";

export default async function ChatPage(props: {
  searchParams?: { query?: string; page?: string };
}) {
  const responseAvatar = await getSingleAvatar(2);

  const user = await currentUser();

  return (
    <ConversationProvider userImageUrl={user?.imageUrl}>
      <ConversationContainer avatar={responseAvatar} />

      <div className="h-[1px] bg-tertiary" />

      <PromptInputBar searchParams={props.searchParams} />
    </ConversationProvider>
  );
}
