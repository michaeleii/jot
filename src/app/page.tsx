import MaxWidthWrapper from "@/components/max-width-wrapper";
import PostList from "@/components/post-list";
import { homeFeedQuery } from "@/db/queries/posts";

async function HomePostList() {
  const posts = await homeFeedQuery.all();
  return <PostList posts={posts} />;
}

export default async function Home() {
  return (
    <MaxWidthWrapper>
      <HomePostList />
    </MaxWidthWrapper>
  );
}
