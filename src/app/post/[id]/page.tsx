import MaxWidthWrapper from "@/components/max-width-wrapper";
import DeletePostDialog from "./delete-post-dialog";

import { singlePostQuery } from "@/db/queries/posts";
import { cookies } from "next/headers";

type SinglePostItemProps = {
  postId: number;
};

async function SinglePostItem({ postId }: SinglePostItemProps) {
  const post = await singlePostQuery.all({ postId }).then((posts) => posts[0]);
  const userId = cookies().get("user_id")?.value;
  const isOwner = userId === post.user.id;
  return (
    <article className="px-5">
      <div className="flex justify-end">
        {isOwner && <DeletePostDialog postId={postId} />}
      </div>
      <h1 className="main-heading mt-10">{post.title}</h1>
      <span className="mb-5 text-sm text-muted-foreground">
        By {post.user.username}
      </span>
      <p className="mt-10 text-muted-foreground">{post.content}</p>
    </article>
  );
}

type SinglePostPageProps = {
  params: { id: string };
};

export default function SinglePostPage({ params }: SinglePostPageProps) {
  const postId = +params.id;
  return (
    <MaxWidthWrapper>
      <SinglePostItem postId={postId} />
    </MaxWidthWrapper>
  );
}
