"use client";

import { useState } from "react";
import { useFormState } from "react-dom";

import { State, createPost } from "./actions";

import FormSubmitButton from "@/components/form-submit-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FormErrors from "@/components/form-errors";
import { cn } from "@/lib/utils";

const initialState: State = { message: null, errors: {} };
const characterLimit = 200;

export default function CreatePostForm() {
  const [state, formAction] = useFormState(createPost, initialState);
  const [characters, setCharacters] = useState(0);

  return (
    <form action={formAction} className="space-y-3">
      <div className="mb-3 flex items-center gap-2">
        <h1 className="text-lg font-bold">Create Post</h1>
      </div>
      <div>
        <Input
          className={cn({ "border-destructive": state.errors?.title })}
          name="title"
          placeholder="Title"
          aria-describedby="title-error"
        />
        <FormErrors id="title-error" errors={state.errors?.title} />
      </div>
      <div>
        <div className="relative">
          <Textarea
            className={cn("min-h-[200px]", {
              "border-destructive": state.errors?.content,
            })}
            name="content"
            onInput={(e) => setCharacters(e.currentTarget.value.length)}
            placeholder="Write down your thoughts..."
            aria-describedby="content-error"
          />
          <p
            className={cn(
              "absolute bottom-2 right-2 mt-3 text-sm text-muted-foreground",
              {
                "font-bold text-destructive": characters > characterLimit,
              },
            )}
          >
            {characters} / {characterLimit}
          </p>
        </div>
        <FormErrors id="content-error" errors={state.errors?.content} />
      </div>
      <div className="w-full">
        <FormSubmitButton value="Create Post" loadingValue="Creating..." />
      </div>
    </form>
  );
}
