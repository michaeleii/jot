"use server";

import { db } from "@/db";
import { userProfileQuery } from "@/db/queries/users";
import { insertPostSchema, posts } from "@/db/schema/posts";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// This is temporary until @types/react-dom is updated
export type State = {
  errors?: {
    title?: string[];
    content?: string[];
  };
  message?: string | null;
};

export async function createPost(_: State, formData: FormData) {
  const newPost = {
    title: formData.get("title"),
    content: formData.get("content"),
  };
  const validatedFields = insertPostSchema.safeParse(newPost);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Form Validation Error: Failed to create post.",
    };
  }

  const post = validatedFields.data;
  const user = await userProfileQuery
    .all({ userId: 1 })
    .then((users) => users[0]);

  if (!user) {
    redirect("/login");
  }

  try {
    await db.insert(posts).values({ ...post, userId: user.id });
  } catch (error) {
    return {
      message: "Database Error: Failed to create post.",
    };
  }
  revalidatePath("/");
  redirect("/");
}