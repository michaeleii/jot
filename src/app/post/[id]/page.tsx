import MaxWidthWrapper from "@/components/max-width-wrapper";
import DeletePostDialog from "./delete-post-dialog";

import { singlePostQuery } from "@/db/queries/posts";
import { cookies } from "next/headers";
import { HeartIcon, Share2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth";

type SinglePostItemProps = {
  postId: number;
};

async function SinglePostItem({ postId }: SinglePostItemProps) {
  const post = await singlePostQuery.all({ postId }).then((posts) => posts[0]);
  const user = await getCurrentUser();
  const isOwner = post.user.id === user.id;
  return (
    <article className="px-5">
      <h1 className="main-heading mt-5">{post.title}</h1>
      <span className="mb-5 text-sm text-muted-foreground">
        By {post.user.name}
      </span>
      <p className="mt-10 text-muted-foreground">{post.content}</p>
      <div className="mt-10 flex items-center justify-end gap-2">
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

type SinglePostPageProps = {
  params: { id: string };
};

export default function SinglePostPage({ params }: SinglePostPageProps) {
  const postId = +params.id;
  return (
    <MaxWidthWrapper className="mt-10">
      <SinglePostItem postId={postId} />
    </MaxWidthWrapper>
  );
}
