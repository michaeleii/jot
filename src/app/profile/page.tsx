import MaxWidthWrapper from "@/components/max-width-wrapper";
import { userProfileQuery } from "@/db/queries/users";
import Image from "next/image";

async function Profile() {
  const user = await userProfileQuery
    .all({ userId: 1 })
    .then((users) => users[0]);
  return (
    <article className="card flex flex-wrap justify-between">
      <div>
        <h1 className="main-heading">{user.username}</h1>
        <p className="mt-10 text-muted-foreground">
          {user.bio.length > 0
            ? user.bio
            : `${user.username} does not have a bio.`}
        </p>
      </div>
      <Image
        className="rounded-full"
        src={user.avatar}
        alt={user.username}
        width={100}
        height={100}
        quality={100}
      />
    </article>
  );
}

export default function ProfilePage() {
  return (
    <MaxWidthWrapper>
      <Profile />
    </MaxWidthWrapper>
  );
}
