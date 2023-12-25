import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const getLoginStatus = async () => {
  const session = await auth();
  return session ? true : false;
};

export const getCurrentUser = async (callbackUrl?: string) => {
  const session = await auth();
  if (!session?.user) {
    return redirect(
      `/api/auth/signin${callbackUrl || `?callbackUrl=${callbackUrl}`}`,
    );
  }
  return session.user;
};
