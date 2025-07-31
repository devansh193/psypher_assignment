"use client";

import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { UserCircleIcon } from "lucide-react";

export const AuthButton = () => {
  return (
    <>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <Button variant={"outline"} className="flex">
            <UserCircleIcon className="size-3" /> Sign in
          </Button>
        </SignInButton>
      </SignedOut>
    </>
  );
};
