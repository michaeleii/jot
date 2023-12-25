import { db, eq, sql } from "..";
import { users } from "../schema/users";

export const userProfileQuery = db
  .select({
    id: users.id,
    name: users.name,
    image: users.image,
  })
  .from(users)
  .where(eq(users.id, sql.placeholder("userId")))
  .prepare();

export type User = Awaited<ReturnType<typeof userProfileQuery.all>>[0];
