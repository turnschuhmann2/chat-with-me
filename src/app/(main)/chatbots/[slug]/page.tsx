import { chatbotTabs } from "@/components/chatbots/tabs";
import ChatbotCard, { type Chatbot } from "@/components/chatbots/chatbot-card";
import { Plus } from "@phosphor-icons/react/dist/ssr";

const chatbots: Chatbot[] = [
  {
    name: "Funny Bob",
    description:
      "Responds to every prompt with some funny story or joke. Good if you’re in need for a laugh!",
    favored: true,
    public: false,
    creatorUserId: "user_2gb6QH8BcLiZUlmq2orzZBPPWxh",
    avatarId: 5,
  },
  {
    name: "Thinker",
    description:
      "A very philosophical chatbot. Has always some interesting thoughts to share and open for discussion at all times!",
    favored: true,
    public: true,
    creatorUserId: "2",
    avatarId: 7,
  },
  {
    name: "Ms Coolio",
    description:
      "Always thinks they’re the coolest person (or robot) in the world. Chatting with this chatbot is like hanging out with the effortlessly cool kid on the block.",
    favored: false,
    public: true,
    creatorUserId: "user_2gb6QH8BcLiZUlmq2orzZBPPWxh",
    avatarId: 4,
  },
];

export default function ChatbotsTabContentPage({
  params,
}: {
  params: { slug: string };
}) {
  const chatbotTab = chatbotTabs[params.slug];

  const tripleChatbots = [
    ...chatbots,
    ...chatbots,
    ...chatbots,
    ...chatbots,
    ...chatbots,
  ];

  return (
    <div className="relative h-full overflow-y-auto">
      <div className="scroll-gutter h-full overflow-y-auto px-2">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(224px,max-content))] justify-items-start gap-6">
          {tripleChatbots.map((chatbot, index) => (
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
