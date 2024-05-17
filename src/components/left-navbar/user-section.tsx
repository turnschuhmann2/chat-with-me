"use client";

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useSignIn,
} from "@clerk/nextjs";

import GuestAvatar from "@/components/guest-avatar";

export default function UserSection() {
  const { isLoaded } = useSignIn();

  return (
    <div className="flex flex-row justify-center gap-4 bg-lightTransparent10 px-4 pb-8 pt-4">
      {!isLoaded ? (
        <GuestAvatar />
      ) : (
        <>
          <SignedOut>
            <SignInButton>
              <button>
                <GuestAvatar />
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{ elements: { userButtonAvatarBox: "size-12" } }}
            />
          </SignedIn>
        </>
      )}

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
