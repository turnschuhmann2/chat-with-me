import ConversationContainer from "@/components/conversation-container";
import PromptInputBar from "@/components/prompt-input-bar";

import ConversationProvider from "@/providers/conversation-provider";

import { getSingleAvatar } from "@/server/db/queries";

export default async function ChatPage(props: {
  searchParams?: { query?: string; page?: string };
}) {
  const responseAvatar = await getSingleAvatar(2);

  return (
    <ConversationProvider>
      <ConversationContainer avatar={responseAvatar} />

      <div className="h-[1px] bg-tertiary" />

      <PromptInputBar searchParams={props.searchParams} />
    </ConversationProvider>
  );
}
