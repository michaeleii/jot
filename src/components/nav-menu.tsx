"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { User2Icon } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { usePathname } from "next/navigation";

export default function NavMenu({ isLoggedin }: { isLoggedin: boolean }) {
  const pathname = usePathname();
  return (
    <nav className="flex items-center gap-5">
      {isLoggedin
        ? pathname !== "/create" && (
            <Link href="/create">
              <Button size="lg">Create Post</Button>
            </Link>
          )
        : pathname !== "/api/auth/signin" && (
            <Link href="/api/auth/signin">
              <Button size="lg">Login</Button>
            </Link>
          )}
      <div className="flex items-center">
        <ModeToggle />
        {isLoggedin && (
          <Link href="/profile">
            <Button variant="ghost" size="icon">
              <User2Icon className="h-6 w-6" />
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
