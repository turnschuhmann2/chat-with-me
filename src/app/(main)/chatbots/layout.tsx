import { chatbotRoutes } from "@/components/chatbots/tabs";
import { TabButton } from "@/components/chatbots/tab-button";

export default async function ChatbotsPageLayout({ children }) {
  return (
    <div className="flex h-full flex-col gap-6">
      <div className="flex flex-row gap-6 p-2 pb-0">
        {Object.values(chatbotRoutes).map((route, index) => (
          <TabButton key={index} route={route} />
        ))}
      </div>

      {children}
    </div>
  );
}
