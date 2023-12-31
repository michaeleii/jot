import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { users } from "./users";
import { createInsertSchema } from "drizzle-zod";
import { media } from "./media";

export const posts = sqliteTable("posts", {
  id: integer("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  title: text("title").notNull(),
  content: text("text").notNull(),
  mediaId: integer("media_id").references(() => media.id),
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

// Schema for inserting a post

export const insertPostSchema = createInsertSchema(posts, {
  title: (schema) =>
    schema.title
      .min(1, "You must enter a title.")
      .max(100, "Your title must be less than 100 characters."),
  content: (schema) =>
    schema.content
      .min(1, "You must enter some content.")
      .max(200, "Your post must be less than 200 characters."),
}).pick({
  title: true,
  content: true,
});
