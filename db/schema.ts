import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const views = mysqlTable("Views", {
  slug: varchar("slug", { length: 191 }).primaryKey(),
  count: int("count").default(1).notNull(),
});

export const posts = mysqlTable("posts", {
  slug: varchar("slug", { length: 191 }).primaryKey(),
  views: int("count").default(0).notNull(),
});
