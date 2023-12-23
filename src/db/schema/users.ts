import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").notNull().primaryKey(),
  username: text("username").notNull().unique(),
  avatar: text("avatar")
    .notNull()
    .default("https://www.gravatar.com/avatar/?d=mp"),
  bio: text("bio").notNull().default(""),
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
