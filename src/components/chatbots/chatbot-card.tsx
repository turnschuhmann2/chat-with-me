import {
  Globe,
  PaintBrushHousehold,
  Users,
  Star,
  Heart,
  ShareNetwork,
  DotsThreeOutlineVertical,
} from "@phosphor-icons/react/dist/ssr";

import { getSingleAvatar } from "@/server/db/queries";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import clsx from "clsx";

export interface Chatbot {
  name: string;
  description: string;
  favored: boolean;
  public: boolean;
  creatorUserId: string;
  avatarId: number;
}

export default async function ChatbotCard({ chatbot }: { chatbot: Chatbot }) {
  const responseAvatar = await getSingleAvatar(chatbot.avatarId);
  const currentUserData = await currentUser();

  const isMyChatbot = chatbot.creatorUserId === currentUserData?.id;

  return (
    <div
      className="flex w-full max-w-[256px] flex-col rounded-xl p-4 duration-200 hover:shadow-lg"
      style={{ backgroundColor: responseAvatar?.backgroundTransparent ?? "" }}
    >
      <div className="flex flex-row items-center justify-between [&_svg]:size-6">
        <div>
          {chatbot.public && (
            <Globe className="fill-lightTransparent80" weight="fill" />
          )}
        </div>

        <div className=" [&>svg]:fill-accent">
          {isMyChatbot ? (
            <PaintBrushHousehold weight="fill" />
          ) : (
            <Users weight="fill" />
          )}
        </div>
      </div>

      <div className="flex flex-row justify-center">
        <div
          className="flex size-[74px] flex-row items-center justify-center rounded-full"
          style={{ backgroundColor: responseAvatar?.backgroundColor ?? "" }}
        >
          <Image
            src={responseAvatar?.fileUrl ?? ""}
            width={70}
            height={70}
            alt="Chatbot avatar"
            className="select-none"
          />
        </div>
      </div>

      <div className="flex h-full flex-col gap-2 pb-4 pt-5 text-white">
        <h3 className="text-base">{chatbot.name}</h3>
        <p className="text-sm">{chatbot.description}</p>
      </div>

      <div className="flex flex-row items-center justify-between [&_svg]:size-7 [&_svg]:duration-200">
        <div className="flex flex-row gap-5">
          <Heart
            className={clsx(
              chatbot.favored
                ? "fill-heartSelected hover:fill-heartHover"
                : "hover:fill-heartHover fill-lightTransparent80",
            )}
            weight="fill"
          />

          <ShareNetwork
            weight="fill"
            className="fill-lightTransparent80 hover:fill-lightTransparent50"
          />
        </div>

        <DotsThreeOutlineVertical
          weight="fill"
          className="fill-lightTransparent80 hover:fill-lightTransparent50"
        />
      </div>
    </div>
  );
}
