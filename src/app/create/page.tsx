import MaxWidthWrapper from "@/components/max-width-wrapper";
import CreatePostForm from "./create-post-form";

export default function CreatePage() {
  return (
    <MaxWidthWrapper className="max-w-lg">
      <CreatePostForm />
    </MaxWidthWrapper>
  );
}
