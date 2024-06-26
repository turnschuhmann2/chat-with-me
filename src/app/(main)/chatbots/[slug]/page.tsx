import { currentUser } from "@clerk/nextjs/server";
import { Plus } from "@phosphor-icons/react/dist/ssr";

import { chatbotRoutes } from "@/components/chatbots/tabs";
import ChatbotCard from "@/components/chatbots/chatbot-card";

import { chatbotFilters, getChatbots } from "@/server/db/queries";

const getChatbotQuery = (userId: string) => ({
  [chatbotRoutes.all]: getChatbots(userId),
  [chatbotRoutes.myCreations]: getChatbots(
    userId,
    chatbotFilters.createdByUser(userId),
  ),
  [chatbotRoutes.fromFriends]: getChatbots(
    userId,
    chatbotFilters.notCreatedByUser(userId),
  ),
  [chatbotRoutes.public]: getChatbots(userId, chatbotFilters.isPublic),
});

export default async function ChatbotsTabContentPage({
  params,
}: {
  params: { slug: string };
}) {
  const currentUserData = await currentUser();

  const query = getChatbotQuery(currentUserData!.id)[params.slug]!;

  const chatbots = await query();

  return (
    <div className="relative h-full overflow-y-auto">
      <div className="scroll-gutter h-full overflow-y-auto px-2">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(224px,max-content))] justify-items-start gap-6">
          {chatbots.map((chatbot, index) => (
            <ChatbotCard key={index} chatbot={chatbot} />
          ))}
        </div>
      </div>

      <button className="shadow-3xl absolute bottom-4 right-10 rounded-2xl border-2 border-darkTransparent50 bg-default px-4 duration-200 hover:bg-defaultHover">
        <div className="flex flex-row items-center gap-3 py-3 text-lg text-defaultContent">
          <Plus className="size-6 fill-defaultContent" />
          New Chatbot
        </div>
      </button>
    </div>
  );
}
