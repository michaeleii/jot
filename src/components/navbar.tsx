import Link from "next/link";
import { User2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="flex justify-between items-center p-5 max-w-7xl mx-auto">
      <Link href="/" className="text-4xl font-bold">
        Jot
      </Link>
      <nav className="flex items-center">
        <Link href="/profile">
          <Button variant="ghost" size="icon">
            <User2Icon className="w-6 h-6" />
          </Button>
        </Link>
      </nav>
    </header>
  );
}
