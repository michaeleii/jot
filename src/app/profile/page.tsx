import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Profile } from "./profile";
import SignOutForm from "./signout-form";

export default function ProfilePage() {
  return (
    <MaxWidthWrapper>
      <Profile />
      <SignOutForm />
    </MaxWidthWrapper>
  );
}
