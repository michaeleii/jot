import Image from "next/image";
import Link from "next/link";

import DeletePostDialog from "./delete-post-dialog";

import { Post, singlePostQuery } from "@/db/queries/posts";
import { HeartIcon, Share2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";

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
    <article className="px-5">
      <h1 className="main-heading mt-5">{post.title}</h1>
      <span className="mb-5 text-sm text-muted-foreground">
        By {post.user.name}
      </span>
      <p className="my-10 text-muted-foreground">{post.content}</p>
      <div>
        <PostMedia content={post.content} media={post.media} />
      </div>
      <div className="my-10 flex items-center justify-start gap-2">
        <Button variant="ghost" size="icon">
          <HeartIcon className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon">
          <Share2Icon className="h-6 w-6" />
        </Button>
        {isOwner && <DeletePostDialog postId={postId} />}
      </div>
    </article>
  );
}
