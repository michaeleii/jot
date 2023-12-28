import { Post } from "@/db/queries/posts";
import PostItem from "./post-item";

type PostListProps = { posts: Post[] };

export default function PostList({ posts }: PostListProps) {
  return (
    <div className="relative mb-20 ml-5 space-y-10 border-l-2 pl-10">
      {posts.map((post) => (
        <PostItem post={post} key={post.id} />
      ))}
    </div>
  );
}
