import { type NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { allPosts } from ".contentlayer/generated";
import { db } from "@/db/connection";
import { posts } from "@/db/schema";

export const runtime = "nodejs";

type Options = {
  params: {
    slug: string;
  };
};

const getPost = async (slug: string) => {
  const result = await db.select().from(posts).where(eq(posts.slug, slug));

  if (result.length === 0) {
    return null;
  }

  return result[0];
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

  const post = await getPost(slug);

  if (!post) {
    return NextResponse.json({
      slug,
      views: 0,
    });
  }

  return NextResponse.json(post);
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

  let post = await getPost(slug);

  if (!post) {
    // Create new record
    await db.insert(posts).values({
      slug,
      views: 1,
    });
  } else {
    // Update record
    await db
      .update(posts)
      .set({ views: post.views + 1 })
      .where(eq(posts.slug, slug));
  }

  post = await getPost(slug);

  return NextResponse.json(post);
};
