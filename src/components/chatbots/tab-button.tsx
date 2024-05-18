"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import clsx from "clsx";

import { chatbotTabs } from "./tabs";

export function TabButton({ route }: { route: string }) {
  const pathname = usePathname();

  const fullRoute = `/chatbots/${route}`;

  const { icon, label } = chatbotTabs[route]!;

  return (
    <Link
      className={clsx(
        "flex cursor-default flex-row items-center gap-3 rounded-xl p-3 text-tertiaryContent duration-200",
        pathname === fullRoute ? "bg-tertiary" : "hover:bg-tertiary50",
      )}
      href={fullRoute}
    >
      {icon}
      {label}
    </Link>
  );
}
