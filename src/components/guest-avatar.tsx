"use client";

import { User } from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";

export default function GuestAvatar(props: { className?: string }) {
  return (
    <div
      className={clsx(
        "flex size-12 flex-row items-center justify-center rounded-full bg-default p-3 duration-100 hover:cursor-pointer hover:opacity-75",
        props.className,
      )}
    >
      <User size="100%" className="fill-defaultContent" />
    </div>
  );
}
