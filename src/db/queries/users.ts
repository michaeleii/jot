import { db } from "..";
import { users } from "../schema/users";

export const userProfileQuery = db.select().from(users).prepare();

export type User = Awaited<ReturnType<typeof userProfileQuery.all>>[0];
