import { Redis } from "@upstash/redis";
import { eq } from "drizzle-orm";

import { db } from "@/db/connection";
import { posts } from "@/db/schema";

const redis = Redis.fromEnv();

export const getRecord = async (slug: string) => {
  const results = await db.select().from(posts).where(eq(posts.slug, slug));

  if (results.length === 0) {
    return null;
  } else {
    return results[0];
  }
};

export const getUserKey = (ip: string, slug: string) => {
  return `upvotes:${ip}:${slug}`;
};

export const getValue = async (ip: string, slug: string) => {
  const key = getUserKey(ip, slug);

  const value = await redis.get(key);

  if (typeof value === "number") {
    return value;
  } else {
    return 0;
  }
};
