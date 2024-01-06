import Image from "next/image";
import Link from "next/link";

import DeletePostDialog from "./delete-post-dialog";

import { Post, singlePostQuery } from "@/db/queries/posts";
import { Copy, HeartIcon, Share2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ShareDialog from "./share-dialog";

type PostMediaProps = {
  content: Post["content"];
  media: Post["media"];
};

function PostMedia({ content, media }: PostMediaProps) {
  if (!media) {
    return null;
  }
  return (
    <Link href={media.url} target="_blank" className="">
      {media.type === "image" ? (
        <div className="w-fill relative mx-auto aspect-video overflow-hidden rounded-xl border">
          <Image
            src={media.url}
            alt={content}
            fill
            className="object-contain"
          />
        </div>
      ) : media.type === "video" ? (
        <video className="w-full object-contain" src={media.url} controls />
      ) : null}
    </Link>
  );
}

type SinglePostItemProps = {
  postId: number;
};

export default async function SinglePostItem({ postId }: SinglePostItemProps) {
  const post = await singlePostQuery.all({ postId }).then((posts) => posts[0]);
  const session = await auth();
  const isOwner = session && post.user.id === session.user.id;
  return (
    <>
      <p className="flex items-center justify-start gap-3 pl-2 text-sm tracking-widest text-muted-foreground">
        <Link href={`/user/${post.user.id}`}>
          <Image
            className="rounded-full"
            src={post.user.image || "https://www.gravatar.com/avatar/?d=mp"}
            alt={post.user.name || ""}
            width={20}
            height={20}
            quality={100}
          />
        </Link>
        <Link href={`/user/${post.user.id}`}>
          <span>{post.user.name}</span>
        </Link>
      </p>
      <article className="mb-10 mt-5 rounded-md border px-10">
        <h1 className="main-heading mt-10">{post.title}</h1>
        <p className="my-10 text-muted-foreground">{post.content}</p>
        <div>
          <PostMedia content={post.content} media={post.media} />
        </div>
        <div className="my-10 flex items-center justify-start gap-2">
          <Button variant="ghost" size="icon">
            <HeartIcon className="h-6 w-6" />
          </Button>
          <ShareDialog />
          {isOwner && <DeletePostDialog postId={postId} />}
        </div>
      </article>
    </>
  );
}
