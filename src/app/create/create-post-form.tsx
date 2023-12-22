import FormSubmitButton from "@/components/form-submit-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFormState } from "react-dom";
import { createPost } from "./actions";

const initialState = { message: "", errors: {} };

export default function CreatePostForm() {
  const [state, formAction] = useFormState(createPost, initialState);
  return (
    <form action={formAction} className="space-y-3">
      <div className="mb-3 flex items-center gap-2">
        <h1 className="text-lg font-bold">Create Post</h1>
      </div>
      <Input placeholder="Title" />
      <Textarea
        className="min-h-[200px]"
        placeholder="Write down your thoughts..."
      />
      <div className="w-full">
        <FormSubmitButton value="Create Post" loadingValue="Creating..." />
      </div>
    </form>
  );
}
