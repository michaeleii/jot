import { cn } from "@/lib/utils";

type MaxWidthWrapperProps = {
  children: React.ReactNode;
  className?: string;
};

export default function MaxWidthWrapper({
  children,
  className,
}: MaxWidthWrapperProps) {
  return (
    <main className={cn("pt-5 px-5 max-w-4xl mx-auto", className)}>
      {children}
    </main>
  );
}
