"use client";

import { useState } from "react";

import { motion } from "framer-motion";
import clsx from "clsx";

import {
  ArrowsLeftRight,
  DotsThreeOutlineVertical,
} from "@phosphor-icons/react/dist/ssr";

import {
  Avatar as AvatarComponent,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { TypographyBody } from "@/components/ui/typography";

import { theme } from "@/styles/theme";

import MenuItems from "./menu-items";

export default function LeftNavbar() {
  const user = {
    name: "Turnschuhmann",
    avatar: "https://avatars.githubusercontent.com/u/1958819",
  };

  const [isExpanded, _setIsExpanded] = useState(false);

  const toggleExpanded = () => _setIsExpanded(prev => !prev);

  return (
    <motion.div
      className={clsx(
        "flex h-full flex-col gap-2 rounded-3xl bg-darkTransparent60 p-0",
        isExpanded && "min-w-72",
      )}
      // onClick={toggleExpanded}
    >
      <div className="flex h-full flex-col gap-6 px-2 pt-6">
        <div className="flex flex-col items-center gap-3 rounded-xl bg-darkTransparent50 px-2 py-4">
          <AvatarComponent className="size-10">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>CN</AvatarFallback>
          </AvatarComponent>

          <ArrowsLeftRight size={20} color={theme.colors.lightTransparent80} />
        </div>

        <MenuItems />
      </div>

      <div className="bg-lightTransparent10 flex flex-row justify-center gap-4 px-4 pb-8 pt-4">
        <AvatarComponent className="size-12">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>CN</AvatarFallback>
        </AvatarComponent>

        {/* {isExpanded && (
          <div className="flex size-full flex-row items-center justify-between">
            <TypographyBody color="neutral">{user.name}</TypographyBody>

            <DotsThreeOutlineVertical
              size={24}
              color={theme.colors.lightTransparent80}
              weight="fill"
            />
          </div>
        )} */}
      </div>
    </motion.div>
  );
}
