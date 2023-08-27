import { type NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { eq } from "drizzle-orm";
import { db } from "@/db/connection";
import { views, posts } from "@/db/schema";
import { allPosts } from ".contentlayer/generated";

export const runtime = "nodejs";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.cachedFixedWindow(1, "1 m"),
  analytics: true,
  ephemeralCache: new Map(),
});

interface Options {
  params: {
    slug: string;
  };
}

const getView = async (slug: string) => {
  const result = await db.select().from(views).where(eq(views.slug, slug));

  if (result.length === 0) {
    return null;
  }

  return result[0];
};

const getPost = async (slug: string) => {
  const result = await db.select().from(posts).where(eq(posts.slug, slug));

  if (result.length === 0) {
    return null;
  }

  return result[0];
};

const migrateData = async (slug: string, views: number) => {
  const post = await getPost(slug);
  if (!post) {
    await db.insert(posts).values({ slug, views });
  } else {
    await db
      .update(posts)
      .set({ views: post.views })
      .where(eq(posts.slug, slug));
  }
};

export const GET = async (request: NextRequest, { params }: Options) => {
  const slug = params.slug;

  const view = await getView(slug);

  if (!view) {
    return NextResponse.json(
      {
        slug,
        count: 0,
      },
      {
        status: 400,
      }
    );
  }

  // Migrate data
  await migrateData(slug, view?.count ?? 0);

  return NextResponse.json(view);
};

export const POST = async (request: NextRequest, { params }: Options) => {
  const ip = request.ip ?? "127.0.0.1";
  const slug = params.slug;

  const post = allPosts.find((item) => item.slug === slug);

  if (!post) {
    return new NextResponse("Not found", { status: 404 });
  }

  // Check rate limit
  const { success, limit, reset, remaining } = await ratelimit.limit(
    `${ip}_${slug}`,
    request
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
      }
    );
  }

  let view = await getView(slug);

  if (!view) {
    await db.insert(views).values({ slug });
  } else {
    await db
      .update(views)
      .set({ count: view.count + 1 })
      .where(eq(views.slug, slug));
  }

  view = await getView(slug);

  // Migrate data
  await migrateData(slug, view?.count ?? 0);

  return NextResponse.json(view);
};
