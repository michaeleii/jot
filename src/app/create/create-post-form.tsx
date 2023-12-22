"use client";

import FormSubmitButton from "@/components/form-submit-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFormState } from "react-dom";
import { State, createPost } from "./actions";
import FormErrors from "@/components/form-errors";

const initialState: State = { message: null, errors: {} };

export default function CreatePostForm() {
  const [state, formAction] = useFormState(createPost, initialState);
  return (
    <form action={formAction} className="space-y-3">
      <div className="mb-3 flex items-center gap-2">
        <h1 className="text-lg font-bold">Create Post</h1>
      </div>
      <div>
        <Input placeholder="Title" aria-describedby="title-error" />
        <FormErrors id="title-error" errors={state.errors?.title} />
      </div>
      <div>
        <Textarea
          className="min-h-[200px]"
          placeholder="Write down your thoughts..."
          aria-describedby="content-error"
        />
        <FormErrors id="content-error" errors={state.errors?.content} />
      </div>
      <div className="w-full">
        <FormSubmitButton value="Create Post" loadingValue="Creating..." />
      </div>
    </form>
  );
}
