import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { users } from "./users";
import { createInsertSchema } from "drizzle-zod";

export const posts = sqliteTable("posts", {
  id: integer("id").notNull().primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  title: text("title"),
  content: text("text"),
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

// Schema for inserting a post

export const insertPostSchema = createInsertSchema(posts);
