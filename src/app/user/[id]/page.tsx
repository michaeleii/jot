import Image from "next/image";

import MaxWidthWrapper from "@/components/max-width-wrapper";
import PostList, { PostListSkeleton } from "@/components/post-list";

import { userFeedQuery } from "@/db/queries/posts";
import { userProfileQuery } from "@/db/queries/users";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";

type UserProfilePageProps = {
  params: {
    id: string;
  };
};

export default function UserProfilePage({ params }: UserProfilePageProps) {
  const userId = params.id;
  return (
    <MaxWidthWrapper>
      <UserProfile id={userId} />
      <Suspense fallback={<PostListSkeleton />}>
        <UserPostsList id={userId} />
      </Suspense>
    </MaxWidthWrapper>
  );
}

async function UserProfile({ id }: { id: string }) {
  const user = await userProfileQuery
    .all({ userId: id })
    .then((users) => users[0]);
  return (
    <article className="card ">
      <div className="flex flex-wrap justify-between">
        <div className="space-y-3">
          <h1 className="main-heading">{user.name}</h1>
          <Button variant="secondary" className="w-full md:w-fit">
            Follow
          </Button>
        </div>
        <Image
          className="rounded-full"
          src={user.image || "https://www.gravatar.com/avatar/?d=mp"}
          alt={user.name || ""}
          width={100}
          height={100}
          quality={100}
        />
      </div>
    </article>
  );
}

async function UserPostsList({ id }: { id: string }) {
  const posts = await userFeedQuery.all({ userId: id });
  return <PostList posts={posts} />;
}
