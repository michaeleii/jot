import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PencilIcon } from "lucide-react";

export default function CreatePage() {
  return (
    <MaxWidthWrapper className="max-w-lg">
      <form className="space-y-3">
        <div className="flex gap-2 items-center mb-10">
          <PencilIcon />
          <h1 className="text-lg font-bold">Create Post</h1>
        </div>
        <Input placeholder="Title" />
        <Textarea placeholder="Write down your thoughts..." />
        <div className="w-full">
          <Button variant="secondary" className="w-full">
            Create
          </Button>
        </div>
      </form>
    </MaxWidthWrapper>
  );
}
