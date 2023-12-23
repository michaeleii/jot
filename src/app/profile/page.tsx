import FormSubmitButton from "@/components/form-submit-button";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { getCurrentUser } from "@/lib/auth";
import Image from "next/image";
import { logout } from "./actions";

async function SignOutForm() {
  return (
    <form action={logout} className="mt-3 w-full">
      <FormSubmitButton value="Sign Out" loadingValue="Signing Out..." />
    </form>
  );
}

async function Profile() {
  const user = await getCurrentUser();
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
      <SignOutForm />
    </MaxWidthWrapper>
  );
}
