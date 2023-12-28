import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Profile } from "./profile";
import { userFeedQuery } from "@/db/queries/posts";
import { getCurrentUser } from "@/lib/auth";
import PostList, { PostListSkeleton } from "@/components/post-list";
import { Suspense } from "react";

async function ProfilePostsList() {
  const user = await getCurrentUser();
  const posts = await userFeedQuery.all({ userId: user.id });
  return <PostList posts={posts} />;
}

export default function ProfilePage() {
  return (
    <MaxWidthWrapper>
      <Profile />
      <Suspense fallback={<PostListSkeleton />}>
        <ProfilePostsList />
      </Suspense>
    </MaxWidthWrapper>
  );
}
