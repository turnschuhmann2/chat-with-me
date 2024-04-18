import ConversationContainer from "./_components/conversation-container";
import PromptInputBar from "./_components/prompt-input-bar";
import ConversationProvider from "./_providers/ConversationProvider";

export default function HomePage(props: {
  searchParams?: { query?: string; page?: string };
}) {
  return (
    <main className="flex h-screen min-h-screen flex-row items-center justify-center bg-gradient-to-br from-[#A2FFE4] to-[#34FFAE] text-white">
      <div className="container flex h-full flex-row items-center justify-between gap-8 px-8 py-12 ">
        <div className="h-full w-1/4 rounded-3xl bg-white bg-opacity-80"></div>

        <div className="flex size-full flex-col">
          <ConversationProvider>
            <ConversationContainer />

            <PromptInputBar searchParams={props.searchParams} />
          </ConversationProvider>
        </div>
      </div>
    </main>
  );
}
