import { InferSelectModel } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// eslint-disable-next-line @typescript-eslint/no-deprecated
export const post = sqliteTable("post", {
  slug: text("slug").primaryKey(),
  views: integer("views").default(0).notNull(),
});
export type PostSelectModel = InferSelectModel<typeof post>;
