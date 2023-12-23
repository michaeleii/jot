import Link from "next/link";
import { User2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";
import { getLoginStatus } from "@/lib/auth";

export default async function Navbar() {
  const isLoggedin = await getLoginStatus();
  return (
    <header className="mx-auto flex max-w-7xl items-center justify-between p-5">
      <Link href="/" className="text-4xl font-bold">
        Jot
      </Link>
      <nav className="flex items-center">
        <ModeToggle />
        {isLoggedin && (
          <Link href="/profile">
            <Button variant="ghost" size="icon">
              <User2Icon className="h-6 w-6" />
            </Button>
          </Link>
        )}
      </nav>
    </header>
  );
}
