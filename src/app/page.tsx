import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Post, homeFeedQuery } from "@/db/queries/posts";
import { CircleIcon } from "lucide-react";
import Link from "next/link";

type PostItemProps = { post: Post };

function PostItem({ post }: PostItemProps) {
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
      </div>
    </>
  );
}

async function PostList() {
  const posts = await homeFeedQuery.all();
  return (
    <div className="relative mb-20 ml-5 space-y-10 border-l-2 pl-10">
      {posts.map((post) => (
        <PostItem post={post} key={post.id} />
      ))}
    </div>
  );
}

export default async function Home() {
  return (
    <MaxWidthWrapper>
      <PostList />
    </MaxWidthWrapper>
  );
}
