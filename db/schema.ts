import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { InferSelectModel } from "drizzle-orm";

export const posts = mysqlTable("posts", {
  slug: varchar("slug", { length: 191 }).primaryKey(),
  views: int("count").default(0).notNull(),
});

export type Post = InferSelectModel<typeof posts>;
