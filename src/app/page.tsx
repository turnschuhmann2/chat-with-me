"use client";

import { useState } from "react";
import useTextTyper, { typingSpeeds } from "./_hooks/useTextTyper";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { ChatBubbleProps } from "./_components/chat-bubble";

const chatBubbles: ChatBubbleProps[] = [
  {
    position: 1,
    content: "Hello!",
    orientation: "left",
  },
  {
    position: 2,
    content:
      "Hi there! My name is Dennis and welcome to my interactive portfolio. Ask me anything!",
    orientation: "right",
  },
];

const text =
  "Hi there! My name is Dennis and welcome to my interactive portfolio. Ask me anything!";

export default function HomePage() {
  const { currentText, startTyping } = useTextTyper(text, typingSpeeds.medium);

  const [searchValue, setSearchValue] = useState("");

  const handleSearchValueChange: React.ChangeEventHandler<
    HTMLInputElement
  > = event => {
    setSearchValue(event.target.value);
  };

  const [chatBubbles, setChatBubbles] = useState([]);

  return (
    <main className="flex h-screen min-h-screen flex-row items-center justify-center bg-gradient-to-br from-[#A2FFE4] to-[#34FFAE] text-white">
      <div className="container flex h-full flex-row items-center justify-between gap-8 px-8 py-12 ">
        <div className="h-full w-1/4 rounded-3xl bg-white bg-opacity-80"></div>

        <div className="flex size-full flex-col">
          <div className="flex h-full w-full flex-col justify-start gap-3 pt-4">
            {/* {chatBubbles.map(bubble => 
              <div
            } */}

            <div className="flex w-full flex-row justify-start gap-2">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div className="rounded-xl rounded-tl-none bg-white p-4 text-black">
                Hello!
              </div>
            </div>

            <div className="flex w-full flex-row justify-end gap-2">
              <div className="rounded-xl rounded-tr-none bg-white p-4 text-black">
                {text}
              </div>

              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>

          <div className="flex w-full flex-col justify-between gap-3 rounded-3xl bg-white px-5 pb-6 pt-3 text-black">
            <input
              className="w-1/2 rounded-xl bg-gray-300 p-3 focus-visible:outline-none"
              type="text"
              placeholder="Search for prompts..."
              value={searchValue}
              onChange={handleSearchValueChange}
            />

            <div className="flex flex-row flex-wrap gap-3">
              <div className="h-16 rounded-xl px-3 py-2 shadow-lg hover:bg-slate-200">
                Say Hi!
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
