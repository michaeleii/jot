"use server";

import { and, db, eq } from "@/db";
import { posts } from "@/db/schema/posts";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deletePost(formData: FormData) {
  const postId = Number(formData.get("postId"));
  const user = await getCurrentUser();
  try {
    await db
      .delete(posts)
      .where(and(eq(posts.id, postId), eq(posts.userId, user.id)));
  } catch (e) {
    return { message: "Database Error: Failed to delete post." };
  }
  revalidatePath("/");
  redirect("/");
}
