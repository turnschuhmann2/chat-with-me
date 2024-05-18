"use client";

import { cloneElement, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import clsx from "clsx";

import { ChatCircleDots, Robot } from "@phosphor-icons/react/dist/ssr";

import { theme } from "@/styles/theme";

const menuItems = [
  {
    label: "Chat",
    icon: <ChatCircleDots />,
    route: "/chat",
  },
  {
    label: "Manage Chatbots",
    icon: <Robot />,
    route: "/chatbots/all",
  },
];

export default function MenuItems() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col gap-2">
      {menuItems.map((item, index) => (
        <Link
          key={index}
          className={clsx(
            "flex cursor-default flex-col items-center rounded-xl p-4  duration-200",
            pathname === item.route
              ? "bg-lightTransparent15"
              : "hover:bg-lightTransparent10",
          )}
          href={item.route}
        >
          {cloneElement(item.icon, {
            size: 28,
            color: theme.colors.lightTransparent80,
            weight: "fill",
          })}
        </Link>
      ))}
    </div>
  );
}
