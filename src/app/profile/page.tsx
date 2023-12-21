import MaxWidthWrapper from "@/components/max-width-wrapper";
import { userProfileQuery } from "@/db/queries/users";

async function Profile() {
  const user = await userProfileQuery
    .all({ userId: 1 })
    .then((users) => users[0]);
  return (
    <article className="card">
      <h1 className="main-heading">{user.username}</h1>
      <p className="mt-10 text-muted-foreground">Enter your bio here.</p>
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
