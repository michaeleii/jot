"use client";

import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function FormSubmitButton({
  value,
  loadingValue,
  variant = "default",
  isLoading,
}: {
  value: React.ReactNode;
  loadingValue: React.ReactNode;
  variant?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "ghost"
    | "link"
    | null
    | undefined;
  isLoading?: boolean;
}) {
  const { pending } = useFormStatus();
  const isPending = pending || isLoading;
  return (
    <Button
      size="lg"
      variant={variant}
      type="submit"
      className="w-full"
      disabled={isPending}
      aria-disabled={isPending}
    >
      {isPending ? (
        <div className="flex items-center gap-2">
          <Loader2Icon className="animate-spin" />
          <span>{loadingValue}</span>
        </div>
      ) : (
        value
      )}
    </Button>
  );
}
