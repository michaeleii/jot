import { db, desc, eq, sql } from "..";
import { posts } from "../schema/posts";
import { users } from "../schema/users";

const baseQuery = db
  .select({
    id: posts.id,
    title: posts.title,
    content: posts.content,
    user: { id: users.id, name: users.name, image: users.image },
    createdAt: posts.createdAt,
  })
  .from(posts)
  .innerJoin(users, eq(users.id, posts.userId));

export const homeFeedQuery = baseQuery.orderBy(desc(posts.createdAt)).prepare();

export const userFeedQuery = baseQuery
  .where(eq(users.id, sql.placeholder("userId")))
  .orderBy(desc(posts.createdAt))
  .prepare();

export const singlePostQuery = baseQuery
  .where(eq(posts.id, sql.placeholder("postId")))
  .prepare();

export type Post = Awaited<ReturnType<typeof homeFeedQuery.all>>[0];
