import FormSubmitButton from "@/components/form-submit-button";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { getCurrentUser } from "@/lib/auth";
import Image from "next/image";
import { logout } from "./actions";

async function SignOutForm() {
  return (
    <form action={logout} className="mt-3 w-full">
      <FormSubmitButton
        variant="secondary"
        value="Sign Out"
        loadingValue="Signing Out..."
      />
    </form>
  );
}

async function Profile() {
  const user = await getCurrentUser();
  return (
    <article className="card flex flex-wrap justify-between">
      <div>
        <h1 className="main-heading">{user.name}</h1>
      </div>
      <Image
        className="rounded-full"
        src={user.image || "https://www.gravatar.com/avatar/?d=mp"}
        alt={user.name || ""}
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
