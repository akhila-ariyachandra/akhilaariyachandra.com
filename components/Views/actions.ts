"use server";

import { db } from "@/db/connection";
import { posts } from "@/db/schema";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(1, "60 s"),
  analytics: true,
});

export const incrementViews = async (slug: string, ip: string) => {
  const { success } = await ratelimit.limit(`${ip}-${slug}`);

  if (!success) {
    return false;
  }

  // Check if row exists
  const results = await db.select().from(posts).where(eq(posts.slug, slug));
  if (results.length === 0) {
    // Create the record
    await db.insert(posts).values({
      slug,
      views: 1,
    });
  } else {
    // Update the record
    const result = results[0];

    await db
      .update(posts)
      .set({ views: result.views + 1 })
      .where(eq(posts.slug, slug));
  }

  revalidateTag("views");

  return true;
};
