import { InferSelectModel } from "drizzle-orm";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const post = pgTable("post", {
  slug: varchar("slug", { length: 191 }).primaryKey(),
  views: integer("count").default(0).notNull(),
});
export type PostSelectModel = InferSelectModel<typeof post>;
