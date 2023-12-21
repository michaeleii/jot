import MaxWidthWrapper from "@/components/max-width-wrapper";
import { singlePostQuery } from "@/db/queries/posts";

type SinglePostItemProps = {
  postId: number;
};

async function SinglePostItem({ postId }: SinglePostItemProps) {
  const post = await singlePostQuery.all({ postId }).then((posts) => posts[0]);
  return (
    <article className="p-10">
      <h1 className="main-heading">{post.title}</h1>
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
