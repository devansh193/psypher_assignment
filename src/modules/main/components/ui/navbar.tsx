import { AuthButton } from "@/modules/auth/components/ui/auth-button";
import { Upgrade } from "./upgrade";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-14 flex items-center justify-between px-2 z-50 w-full bg-transparent backdrop-blur-md max-w-7xl mx-auto">
      <Link href={"/"} className="text-lg font-bold">
        <h1 className="font-medium text-xl tracking-wider">EVENT</h1>
      </Link>

      <div className="flex-shrink-0 items-center flex gap-4">
        <Upgrade />
        <AuthButton />
      </div>
    </nav>
  );
};
