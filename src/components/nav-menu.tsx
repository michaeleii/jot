"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { User2Icon } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import SignOutForm from "@/app/profile/signout-form";

function ProfileDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <User2Icon className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/profile" className="flex items-center">
              <User2Icon className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <SignOutForm />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

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
        {isLoggedin && <ProfileDropdownMenu />}
      </div>
    </nav>
  );
}
