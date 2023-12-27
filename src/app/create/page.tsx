import MaxWidthWrapper from "@/components/max-width-wrapper";
import CreatePostForm from "./create-post-form";
import { getLoginStatus } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function CreatePage() {
  const isLoggedin = await getLoginStatus();
  if (!isLoggedin) {
    redirect("/api/auth/signin?callbackUrl=/create");
  }
  return (
    <MaxWidthWrapper className="my-10 max-w-lg">
      <CreatePostForm />
    </MaxWidthWrapper>
  );
}
