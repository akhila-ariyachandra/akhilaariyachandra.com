import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/db/connection";
import { posts } from "@/db/schema";
import type { PostsTotalResponse } from "@/lib/types";

export const runtime = "edge";

export const GET = async () => {
  const result = await db
    .select({
      views: sql<number>`SUM(count)`,
      upvotes: sql<number>`SUM(upvotes)`,
    })
    .from(posts);

  if (result.length === 0) {
    return NextResponse.json(
      {
        error: "Not found",
      },
      {
        status: 404,
      },
    );
  }

  const response: PostsTotalResponse = {
    views: result[0].views,
    upvotes: result[0].upvotes,
  };
  return NextResponse.json(response);
};
