"use server";

import { and, db, eq } from "@/db";
import { singlePostQuery } from "@/db/queries/posts";
import { media } from "@/db/schema/media";
import { posts } from "@/db/schema/posts";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "@/s3";

export async function deletePost(formData: FormData) {
  const postId = Number(formData.get("postId"));
  const post = await singlePostQuery.all({ postId }).then((posts) => posts[0]);
  if (!post) {
    return { message: "Post not found." };
  }

  const user = await getCurrentUser();
  if (user.id !== post.user.id) {
    return { message: "You can only delete your own posts." };
  }

  try {
    await db
      .delete(posts)
      .where(and(eq(posts.id, postId), eq(posts.userId, user.id)));

    if (post.media) {
      const mediaItem = await db
        .delete(media)
        .where(and(eq(media.id, post.media.id), eq(media.userId, user.id)))
        .returning()
        .then((media) => media[0]);

      const deleteObjectCommand = new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: mediaItem.url.split("/").pop()!,
      });
      await s3.send(deleteObjectCommand);
    }
  } catch (e) {
    return { message: "Database Error: Failed to delete post." };
  }
  revalidatePath("/");
  redirect("/");
}
