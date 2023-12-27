import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./users";

export const media = sqliteTable("media", {
  id: integer("id").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
  type: text("type", { enum: ["image", "video"] }).notNull(),
  url: text("url").notNull(),
});
