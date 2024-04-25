import { ScrollArea } from "../components/ui/scroll-area";
import ConversationContainer from "./_components/conversation-container";
import PromptInputBar from "./_components/prompt-input-bar";
import ConversationProvider from "./_providers/ConversationProvider";

export default function HomePage(props: {
  searchParams?: { query?: string; page?: string };
}) {
  return (
    <main className="gradient-background flex h-screen min-h-screen flex-row items-center justify-center">
      <div className="container flex h-full flex-row items-center justify-between gap-8 px-8 py-12 ">
        {/* <div className="h-full w-1/4 rounded-3xl bg-white bg-opacity-80"></div> */}

        <div className="bg-darkTransparent50 flex size-full flex-col gap-6 rounded-3xl p-6 pb-8">
          <ConversationProvider>
            <ScrollArea>
              <ConversationContainer />
            </ScrollArea>

            <div className="bg-lightTransparent50 h-[1px]" />

            <PromptInputBar searchParams={props.searchParams} />
          </ConversationProvider>
        </div>
      </div>
      y
    </main>
  );
}
