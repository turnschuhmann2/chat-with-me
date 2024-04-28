import Link from "next/link";
import { ScrollArea } from "../components/ui/scroll-area";
import ConversationContainer from "../components/conversation-container";
import PromptInputBar from "../components/prompt-input-bar";
import ConversationProvider from "../providers/conversation-provider";

export default function HomePage(props: {
  searchParams?: { query?: string; page?: string };
}) {
  return (
    <main className="gradient-background flex h-screen min-h-screen flex-row items-center justify-center">
      <div className="container flex h-full flex-row items-center justify-between gap-8 px-2 py-2 md:px-8 md:py-12 ">
        {/* <div className="h-full w-1/4 rounded-3xl bg-white bg-opacity-80"></div> */}

        <div className="flex size-full flex-col gap-3 rounded-3xl bg-darkTransparent50 p-2 pb-5 md:gap-6 md:p-6 md:pb-8">
          <ConversationProvider>
            <ScrollArea>
              <ConversationContainer />
            </ScrollArea>

            <div className="h-[1px] bg-lightTransparent50" />

            <PromptInputBar searchParams={props.searchParams} />
          </ConversationProvider>
        </div>
      </div>
    </main>
  );
}
