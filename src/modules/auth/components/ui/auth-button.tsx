"use client";

import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export const AuthButton = () => {
  return (
    <>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <div className="flex gap-2 items-center">
          <SignUpButton>
            <Button variant={"outline"} size={"sm"}>
              Sign up
            </Button>
          </SignUpButton>
          <SignInButton>
            <Button variant={"default"} size={"sm"}>
              Sign in
            </Button>
          </SignInButton>
        </div>
      </SignedOut>
    </>
  );
};
