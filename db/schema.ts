import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const views = mysqlTable("Views", {
  slug: varchar("slug", { length: 191 }).primaryKey(),
  count: int("count").default(1).notNull(),
});
