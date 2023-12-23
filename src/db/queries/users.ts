import { db, eq, sql } from "..";
import { users } from "../schema/users";

export const userProfileQuery = db
  .select()
  .from(users)
  .where(eq(users.id, sql.placeholder("userId")))
  .prepare();

export type User = Awaited<ReturnType<typeof userProfileQuery.all>>[0];
