import { chatbotTabs } from "@/components/chatbots/tabs";

const filter = {};

export default async function ChatbotsTabContentPage({
  params,
}: {
  params: { slug: string };
}) {
  const chatbotTab = chatbotTabs[params.slug];

  return <>{params.slug}</>;
}
