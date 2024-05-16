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
    path: "/chat",
  },
  {
    label: "Manage Chatbots",
    icon: <Robot />,
    path: "/chatbots",
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
            "hover:bg-lightTransparent15 flex flex-col items-center rounded-xl p-4",
            pathname === item.path && "bg-lightTransparent15",
          )}
          href={item.path}
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
