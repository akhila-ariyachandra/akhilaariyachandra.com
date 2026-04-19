import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const postsTable = pgTable("Post", {
  slug: varchar("slug", { length: 255 }).primaryKey(),
  views: integer("views").default(0).notNull(),
});
