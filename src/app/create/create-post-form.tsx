"use client";

import { useState } from "react";
import { useFormState } from "react-dom";

import { State, createPost, getSignedURL } from "./actions";

import FormSubmitButton from "@/components/form-submit-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FormErrors from "@/components/form-errors";
import { cn, computeSHA256 } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { PaperclipIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { acceptedFileTypes } from "./acceptedFileTypes";

const initialState: State = { message: null, errors: {} };
const characterLimit = 200;

export default function CreatePostForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [state, createPostAction] = useFormState(createPost, initialState);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [characters, setCharacters] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFile(file);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
  };

  const handleFileUpload = async (file: File) => {
    const checksum = await computeSHA256(file);
    const { error, url, mediaId } = await getSignedURL(
      file.type,
      file.size,
      checksum,
    );

    if (error) {
      throw new Error(error);
    }

    if (!url) {
      throw new Error("No signed URL returned");
    }

    if (!mediaId) {
      throw new Error("No media ID returned");
    }

    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    return mediaId;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);

    try {
      if (file) {
        const mediaId = await handleFileUpload(file);
        formData.set("mediaId", String(mediaId));
      }
      await createPostAction(formData);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        state.message = error.message;
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="mb-3 flex items-center gap-2">
        <h1 className="main-heading">Create</h1>
      </div>
      {state.message && (
        <FormErrors id="create-error" errors={[state.message]} />
      )}
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
            className={cn("min-h-[200px] pb-10", {
              "border-destructive": state.errors?.content,
            })}
            name="content"
            onInput={(e) => setCharacters(e.currentTarget.value.length)}
            placeholder="Write down your thoughts..."
            aria-describedby="content-error"
          />

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute bottom-2 left-2"
          >
            <Label
              htmlFor="media"
              className="flex h-full cursor-pointer items-center"
            >
              <PaperclipIcon />
            </Label>
          </Button>
          <Input
            id="media"
            type="file"
            className="hidden"
            name="media"
            accept={acceptedFileTypes.join(",")}
            onChange={handleFileChange}
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

      {previewUrl && file && (
        <div>
          {file.type.startsWith("image/") ? (
            <img src={previewUrl} alt="preview" />
          ) : file.type.startsWith("video/") ? (
            <video src={previewUrl} controls></video>
          ) : null}
        </div>
      )}
      <div className="w-full">
        <FormSubmitButton
          isLoading={isLoading}
          value="Create Post"
          loadingValue="Creating..."
        />
      </div>
    </form>
  );
}
