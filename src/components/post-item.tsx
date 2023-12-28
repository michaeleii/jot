import { Post } from "@/db/queries/posts";
import { CircleIcon } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";

import Image from "next/image";

type PostItemProps = { post: Post };

export default function PostItem({ post }: PostItemProps) {
  return (
    <>
      <div className="absolute -left-2.5">
        <CircleIcon className="h-4 w-4 fill-background stroke-muted-foreground" />
      </div>
      <div>
        <p className="mb-5 text-xs tracking-widest text-muted-foreground">
          {new Intl.DateTimeFormat().format(new Date(post.createdAt))}
        </p>
        <Link href={`/post/${post.id}`}>
          <article className="card transition-all hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] dark:hover:shadow-[0_3px_10px_rgb(255,255,255,0.2)]">
            <h2 className="mb-2 text-lg font-semibold">{post.title}</h2>
            <p className="text-sm text-muted-foreground">{post.content}</p>
          </article>
        </Link>
        <p className="my-5 flex items-center justify-end gap-3 pr-3 text-xs tracking-widest text-muted-foreground">
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
      </div>
    </>
  );
}

export function PostItemSkeleton() {
  return (
    <>
      <div className="absolute -left-2.5">
        <CircleIcon className="h-4 w-4 fill-background stroke-muted-foreground" />
      </div>
      <div>
        <Skeleton className="mb-5 h-3 w-[100px]" />
        <article className="card">
          <Skeleton className="mb-2 h-5  w-[200px]" />
          <Skeleton className="h-5" />
        </article>
      </div>
    </>
  );
}
