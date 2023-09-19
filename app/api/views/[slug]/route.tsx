import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";

import { db } from "@/db/connection";
import { posts, type PostsSelectModel } from "@/db/schema";

import { allPosts } from ".contentlayer/generated";

export const runtime = "nodejs";

const getRecord = async (slug: string) => {
  const results = await db.select().from(posts).where(eq(posts.slug, slug));

  if (results.length === 0) {
    return null;
  } else {
    return results[0];
  }
};

type Options = {
  params: {
    slug: string;
  };
};

export const GET = async (request: NextRequest, { params }: Options) => {
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

  const result = await getRecord(slug);

  if (!result) {
    return NextResponse.json({
      slug,
      views: 0,
      upvotes: 0,
    } satisfies PostsSelectModel);
  } else {
    return NextResponse.json(result);
  }
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

  const result = await getRecord(slug);

  if (!result) {
    // Create new record
    await db.insert(posts).values({
      slug,
      views: 1,
    });
  } else {
    // Update record
    await db
      .update(posts)
      .set({ views: result.views + 1 })
      .where(eq(posts.slug, slug));
  }

  const updatedResult = await getRecord(slug);

  return NextResponse.json(updatedResult);
};
