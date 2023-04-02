import "server-only";

import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

const conn = connect({
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
});

export const db = drizzle(conn);

export const views = mysqlTable("Views", {
  slug: varchar("slug", { length: 191 }).primaryKey(),
  count: int("count").default(1).notNull(),
});
