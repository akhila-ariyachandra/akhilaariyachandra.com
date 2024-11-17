import { db } from "@/_db/connection";
import { post } from "@/_db/schema";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { allPosts } from "content-collections";
import { eq } from "drizzle-orm";
import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";

const blogPaths = allPosts.map((post) => `/blog/${post._meta.path}`);

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(1, "60 s"),
  analytics: true,
});

const incrementViews = async (slug: string, ip: string) => {
  const { success } = await ratelimit.limit(`${ip}-${slug}`);

  if (!success) {
    return false;
  }

  // Check if row exists
  const results = await db.select().from(post).where(eq(post.slug, slug));
  const result = results[0];
  if (!result) {
    // Create the record
    await db.insert(post).values({
      slug,
      views: 1,
    });
  } else {
    // Update the record
    await db
      .update(post)
      .set({ views: result.views + 1 })
      .where(eq(post.slug, slug));
  }

  return true;
};

export const middleware = (req: NextRequest, event: NextFetchEvent) => {
  if (blogPaths.includes(req.nextUrl.pathname)) {
    const slug = req.nextUrl.pathname.replace("/blog/", "");

    let ip = "";

    const FALLBACK_IP_ADDRESS = "0.0.0.0";
    const forwardedFor = req.headers.get("x-forwarded-for");

    if (forwardedFor) {
      ip = forwardedFor.split(",")[0] ?? FALLBACK_IP_ADDRESS;
    } else {
      ip = req.headers.get("x-real-ip") ?? FALLBACK_IP_ADDRESS;
    }

    event.waitUntil(incrementViews(slug, ip));
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
