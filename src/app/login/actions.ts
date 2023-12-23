import { db, eq } from "@/db";
import { users } from "@/db/schema/users";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export type State = {
  message?: string | null;
};

export async function login(_: State, formData: FormData) {
  const username = formData.get("username")?.toString();
  if (!username) {
    return { message: "You must enter a username." };
  }
  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .then((users) => users[0]);
    if (!user) {
      return { message: "User not found." };
    }

    cookies().set("user_id", user.id);
  } catch (error) {
    return { message: "Database Error: Failed to login." };
  }

  revalidatePath("/");
  redirect("/");
}
