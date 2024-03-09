"use server";

import { db } from "@/_db/connection";
import { db as newDb } from "@/_db/new-connection";
import { post as newPost } from "@/_db/new-schema";
import { posts } from "@/_db/schema";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { headers } from "next/headers";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(1, "60 s"),
  analytics: true,
});

export const incrementViews = async (slug: string) => {
  let ip = "";

  const FALLBACK_IP_ADDRESS = "0.0.0.0";
  const forwardedFor = headers().get("x-forwarded-for");

  if (forwardedFor) {
    ip = forwardedFor.split(",")[0] ?? FALLBACK_IP_ADDRESS;
  } else {
    ip = headers().get("x-real-ip") ?? FALLBACK_IP_ADDRESS;
  }

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

  // Start writing to new database
  const newResults = await newDb
    .select()
    .from(newPost)
    .where(eq(newPost.slug, slug));
  if (newResults.length === 0) {
    // Create the record
    await newDb.insert(newPost).values({
      slug,
      views: 1,
    });
  } else {
    // Update the record
    const result = newResults[0];

    await newDb
      .update(newPost)
      .set({ views: result.views + 1 })
      .where(eq(newPost.slug, slug));
  }

  revalidateTag("views");

  return true;
};
