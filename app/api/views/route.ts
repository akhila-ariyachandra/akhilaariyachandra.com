import { NextResponse } from "next/server";
import { db } from "@/db/connection";
import { views } from "@/db/schema";
import { sql } from "drizzle-orm";

export const runtime = "edge";

export const GET = async () => {
  const result = await db
    .select({
      sum: sql<number>`SUM(${views.count})`,
    })
    .from(views);

  let count = 0;
  if (result.length > 0 && result[0].sum) {
    count = result[0].sum;
  }

  return NextResponse.json({ count });
};
