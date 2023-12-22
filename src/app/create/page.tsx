import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function CreatePage() {
  return (
    <MaxWidthWrapper className="max-w-lg">
      <form className="space-y-3">
        <div className="mb-3 flex items-center gap-2">
          <h1 className="text-lg font-bold">Create Post</h1>
        </div>
        <Input placeholder="Title" />
        <Textarea
          className="min-h-[200px]"
          placeholder="Write down your thoughts..."
        />
        <div className="w-full">
          <Button size="lg" className="w-full">
            Create
          </Button>
        </div>
      </form>
    </MaxWidthWrapper>
  );
}
