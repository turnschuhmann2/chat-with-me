"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import {
  Avatar as AvatarComponent,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

export default function UserSection() {
  return (
    <div className="flex flex-row justify-center gap-4 bg-lightTransparent10 px-4 pb-8 pt-4">
      <SignedOut>
        <SignInButton>
          <AvatarComponent className="size-12 duration-100 hover:cursor-pointer hover:opacity-75">
            <AvatarImage src="https://avatars.githubusercontent.com/u/1958819" />

            <AvatarFallback>CN</AvatarFallback>
          </AvatarComponent>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <UserButton
          appearance={{ elements: { userButtonAvatarBox: "size-12" } }}
        />
      </SignedIn>

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
  );
}
