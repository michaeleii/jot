"use server";

import { db, eq } from "@/db";
import { posts } from "@/db/schema/posts";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deletePost(formData: FormData) {
  const postId = Number(formData.get("postId"));
  try {
    await db.delete(posts).where(eq(posts.id, postId));
  } catch (e) {
    return { message: "Database Error: Failed to delete post." };
  }
  revalidatePath("/");
  redirect("/");
}
