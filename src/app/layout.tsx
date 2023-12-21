import type { Metadata } from "next";
import { cn } from "@/lib/utils";

import "./globals.css";

import Navbar from "@/components/navbar";
import { inter } from "@/fonts";

export const metadata: Metadata = {
  title: "Jot",
  description: "Write and share your thoughts with the world.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn("antialiased", inter.className)}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
