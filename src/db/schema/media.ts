import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const media = sqliteTable("media", {
  id: integer("id").notNull().primaryKey(),
  type: text("type", { enum: ["image", "video"] }).notNull(),
  url: text("url").notNull(),
});
