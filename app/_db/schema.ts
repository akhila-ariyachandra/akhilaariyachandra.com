import { InferSelectModel } from "drizzle-orm";
import { integer, pgTable, text } from "drizzle-orm/pg-core";

export const post = pgTable("post", {
  slug: text("slug").primaryKey(),
  views: integer("count").default(0).notNull(),
});
export type PostSelectModel = InferSelectModel<typeof post>;
