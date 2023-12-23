import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { userProfileQuery } from "@/db/queries/users";

export const getLoginStatus = async () => {
  const userId = cookies().get("user_id")?.value;
  if (!userId) {
    return false;
  }
  const user = await userProfileQuery.all({ userId }).then((users) => users[0]);
  if (!user) {
    return false;
  }
  return true;
};

export const getCurrentUser = async () => {
  const userId = cookies().get("user_id")?.value;
  if (!userId) {
    redirect("/login");
  }
  const user = await userProfileQuery.all({ userId }).then((users) => users[0]);
  if (!user) {
    redirect("/login");
  }
  return user;
};
