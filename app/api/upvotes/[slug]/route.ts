import { Redis } from "@upstash/redis";
import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/db/connection";
import { posts, type PostsSelectModel } from "@/db/schema";
import { MAX_UPVOTES } from "@/lib/constants";

import { allPosts, allSnippets } from ".contentlayer/generated";

type ResponseFormat = Omit<PostsSelectModel, "views"> & {
  userVotes: number;
};

export const runtime = "nodejs";

const redis = Redis.fromEnv();

const getRecord = async (slug: string) => {
  const results = await db.select().from(posts).where(eq(posts.slug, slug));

  if (results.length === 0) {
    return null;
  } else {
    return results[0];
  }
};

const getUserKey = (ip: string, slug: string) => {
  return `upvotes:${ip}:${slug}`;
};

const getValue = async (ip: string, slug: string) => {
  const key = getUserKey(ip, slug);

  const value = await redis.get(key);

  if (typeof value === "number") {
    return value;
  } else {
    return 0;
  }
};

type Options = {
  params: {
    slug: string;
  };
};

export const GET = async (request: NextRequest, { params }: Options) => {
  const slug = params.slug;
  const ip = request.ip ?? "127.0.0.1";
  console.log("> upvotes request.ip: ", request.ip);

  if (
    !allPosts.map((post) => post.slug).includes(slug) &&
    !allSnippets.map((snippet) => snippet.slug).includes(slug)
  ) {
    return NextResponse.json(
      {
        error: "Not found",
      },
      {
        status: 404,
      },
    );
  }

  const record = await getRecord(slug);
  const value = await getValue(ip, slug);

  if (!record) {
    return NextResponse.json({
      slug,
      upvotes: 0,
      userVotes: value,
    } satisfies ResponseFormat);
  }

  return NextResponse.json({
    slug,
    upvotes: record.upvotes,
    userVotes: value,
  } satisfies ResponseFormat);
};

const bodySchema = z.object({
  count: z.number().int().min(0).max(MAX_UPVOTES),
});

export const POST = async (request: NextRequest, { params }: Options) => {
  const slug = params.slug;
  const ip = request.ip ?? "127.0.0.1";

  if (
    !allPosts.map((post) => post.slug).includes(slug) &&
    !allSnippets.map((snippet) => snippet.slug).includes(slug)
  ) {
    return NextResponse.json(
      {
        error: "Not found",
      },
      {
        status: 404,
      },
    );
  }

  try {
    const body = await request.json();
    const data = await bodySchema.parseAsync(body);

    const record = await getRecord(slug);
    const value = await getValue(ip, slug);

    if (!record) {
      // This will never happen because the POST call of the view API will always happen
      // before this as it gets called on page load meaning the record will always exist
      // in the database. This check is more to satisfy TypeScript.
      return NextResponse.json(
        {
          error: "Not found",
        },
        {
          status: 404,
        },
      );
    }

    // Value to change the value in the main database by
    const changeBy = data.count - value;

    // Update the main database
    await db
      .update(posts)
      .set({
        upvotes: record.upvotes + changeBy,
      })
      .where(eq(posts.slug, slug));
    // Update the user's value in Redis
    await redis.set(getUserKey(ip, slug), data.count, {
      ex: 60 * 60 * 24 * 30, // 1 month
    });

    return NextResponse.json({
      slug,
      upvotes: record.upvotes + changeBy,
      userVotes: data.count,
    } satisfies ResponseFormat);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
};
