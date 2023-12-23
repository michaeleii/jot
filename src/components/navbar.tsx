import Link from "next/link";
import { getLoginStatus } from "@/lib/auth";
import NavMenu from "./nav-menu";

export default async function Navbar() {
  const isLoggedin = await getLoginStatus();
  return (
    <header className="mx-auto flex items-center justify-between gap-2 border-b-2 p-5">
      <Link href="/" className="text-4xl font-bold">
        Jot
      </Link>
      <NavMenu isLoggedin={isLoggedin} />
    </header>
  );
}
