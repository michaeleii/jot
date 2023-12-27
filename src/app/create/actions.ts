"use server";

import { auth } from "@/auth";

import { db } from "@/db";
import { insertPostSchema, posts } from "@/db/schema/posts";
import { media } from "@/db/schema/media";

import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { acceptedFileTypes } from "./acceptedFileTypes";
import { generateRandomString } from "@/lib/utils";

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const maxFileSize = 1024 * 1024 * 10; // 10 MB

export async function getSignedURL(
  type: string,
  size: number,
  checksum: string,
) {
  const session = await auth();
  if (!session) {
    return { error: "Authentication Error: You are not signed in." };
  }

  if (!acceptedFileTypes.includes(type)) {
    return { error: "File Error: Invalid file type." };
  }
  if (size > maxFileSize) {
    return { error: "File Error: File size is too large." };
  }
  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: generateRandomString(),
    ContentType: type,
    ContentLength: size,
    ChecksumSHA256: checksum,
    Metadata: {
      userId: session.user.id,
    },
  });

  const signedUrl = await getSignedUrl(s3, putObjectCommand, {
    expiresIn: 60,
  });

  const mediaUrl = signedUrl.split("?")[0];

  const { id } = await db
    .insert(media)
    .values({
      userId: session.user.id,
      type: type.startsWith("image") ? "image" : "video",
      url: mediaUrl,
    })
    .returning({ id: media.id })
    .then((res) => res[0]);

  return { url: mediaUrl, mediaId: id };
}

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
      message: "",
    };
  }

  const post = validatedFields.data;
  const user = await getCurrentUser("/create");
  const mediaId = formData.get("mediaId")
    ? Number(formData.get("mediaId"))
    : null;

  try {
    await db.insert(posts).values({ ...post, userId: user.id, mediaId });
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    return {
      message: "Database Error: Failed to create post.",
    };
  }
  revalidatePath("/");
  redirect("/");
}
