export type ChatBubbleProps = {
  position: number;
  content: string;
  orientation: "left" | "right";
};

const ChatBubble = ({ position, content, orientation }: ChatBubbleProps) => {
  return (
    <div className="flex w-full flex-row justify-start gap-2">
      <div className="rounded-xl rounded-tl-none bg-white p-4 text-black">
        Hello!
      </div>
    </div>
  );
};

export default ChatBubble;
