import MaxWidthWrapper from "@/components/max-width-wrapper";
import CreatePostForm from "./create-post-form";
import { getLoginStatus } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function CreatePage() {
  const isLoggedin = await getLoginStatus();
  if (!isLoggedin) {
    redirect("/login");
  }
  return (
    <MaxWidthWrapper className="max-w-lg">
      <CreatePostForm />
    </MaxWidthWrapper>
  );
}
