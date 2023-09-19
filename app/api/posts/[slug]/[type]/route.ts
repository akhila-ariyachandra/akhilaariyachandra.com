import { Redis } from "@upstash/redis";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/db/connection";
import { posts } from "@/db/schema";
import { MAX_UPVOTES } from "@/lib/constants";
import { getIp } from "@/lib/server-helpers";
import type { PostsResponse } from "@/lib/types";

import { getRecord, getUserKey, getValue } from "../db.helpers";
import { allPosts, allSnippets } from ".contentlayer/generated";

export const runtime = "nodejs";

const redis = Redis.fromEnv();

const typeSchema = z.enum(["views", "upvotes"]);
const upvotesSchema = z.object({
  count: z.number().int().min(0).max(MAX_UPVOTES),
});

type Options = {
  params: {
    slug: string;
    type: string;
  };
};

export const POST = async (request: NextRequest, { params }: Options) => {
  const slug = params.slug;
  const ip = getIp(request);

  // Blog post or code snippet must exist
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

  // Limit what can be passed in the `type` parameter
  const parseResult = await typeSchema.safeParseAsync(params.type);
  if (!parseResult.success) {
    return NextResponse.json(
      {
        error: "Not found",
      },
      {
        status: 404,
      },
    );
  }
  const type = parseResult.data;

  // Check record in database and create if it doesn't exist
  let record = await getRecord(slug);
  if (!record) {
    await db.insert(posts).values({
      slug,
    });
  }

  // Get updated record
  record = await getRecord(slug);
  if (!record) {
    const response: PostsResponse = {
      slug,
      views: 0,
      upvotes: 0,
      userVotes: 0,
    };
    return NextResponse.json(response);
  }

  // Get user votes
  const userVotes = await getValue(ip, slug);

  if (type === "views") {
    // Update record
    await db
      .update(posts)
      .set({ views: record.views + 1 })
      .where(eq(posts.slug, slug));

    const response: PostsResponse = {
      ...record,
      views: record.views + 1,
      userVotes,
    };
    return NextResponse.json(response);
  } else if (type === "upvotes") {
    const body = await request.json();
    const parseResult = await upvotesSchema.safeParseAsync(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: "Invalid body",
        },
        {
          status: 400,
        },
      );
    }

    const count = parseResult.data.count;

    // Value to change the value in the main database by
    const changeBy = count - userVotes;

    // Update the main database
    await db
      .update(posts)
      .set({
        upvotes: record.upvotes + changeBy,
      })
      .where(eq(posts.slug, slug));

    // Update the user's votes in Redis
    await redis.set(getUserKey(ip, slug), count, {
      ex: 60 * 60 * 24 * 30, // 1 month
    });

    const response: PostsResponse = {
      ...record,
      views: record.upvotes + changeBy,
      userVotes: count,
    };
    return NextResponse.json(response);
  }
};
