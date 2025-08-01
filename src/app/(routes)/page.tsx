import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Link href={"/events"}>
        <Button className="hover:cursor-pointer">Go to events</Button>
      </Link>
    </div>
  );
}
