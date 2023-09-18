import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

import { db } from "@/db/connection";
import { posts } from "@/db/schema";

import { allPosts } from ".contentlayer/generated";

export const runtime = "nodejs";

type Options = {
  params: {
    slug: string;
  };
};

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.cachedFixedWindow(1, "1 m"),
  analytics: true,
  ephemeralCache: new Map(),
});

export const POST = async (request: NextRequest, { params }: Options) => {
  const ip = request.ip ?? "127.0.0.1";
  const slug = params.slug;

  if (!allPosts.map((post) => post.slug).includes(slug)) {
    return NextResponse.json(
      {
        error: "Not found",
      },
      {
        status: 404,
      },
    );
  }

  // Check rate limit
  const { success, limit, reset, remaining } = await ratelimit.limit(
    `${ip}_${slug}`,
    request,
  );
  if (!success) {
    return NextResponse.json(
      {
        error: "Too many requests",
      },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": reset.toString(),
        },
      },
    );
  }

  const result = await db.select().from(posts).where(eq(posts.slug, slug));

  if (result.length === 0) {
    // Create new record
    await db.insert(posts).values({
      slug,
      views: 1,
    });
  } else {
    // Update record
    await db
      .update(posts)
      .set({ views: result[0].views + 1 })
      .where(eq(posts.slug, slug));
  }

  // Revalidate pages
  revalidatePath("/blog");
  revalidatePath("/blog/[slug]");

  return NextResponse.json({ message: "Incremented" });
};
