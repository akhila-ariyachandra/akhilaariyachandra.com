import { InferSelectModel } from "drizzle-orm";
import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const posts = mysqlTable("posts", {
  slug: varchar("slug", { length: 191 }).primaryKey(),
  views: int("count").default(0).notNull(),
  upvotes: int("upvotes").default(0).notNull(),
});
export type PostsSelectModel = InferSelectModel<typeof posts>;
