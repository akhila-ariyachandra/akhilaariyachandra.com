import {
  type NextRequest,
  NextResponse,
  type NextFetchEvent,
} from "next/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.cachedFixedWindow(1, "1 m"),
  analytics: true,
  ephemeralCache: new Map(),
});

export const config = {
  matcher: "/api/views/:slug*",
};

export const middleware = async (
  request: NextRequest,
  event: NextFetchEvent
) => {
  // Limit blog post views increment
  if (request.method === "POST") {
    const ip = request.ip ?? "127.0.0.1";
    const slug = request.nextUrl.pathname.replace("/api/views/", "");

    const { success, pending, limit, reset, remaining } = await ratelimit.limit(
      `${ip}_${slug}`,
      request
    );
    event.waitUntil(pending);

    const res = success
      ? NextResponse.next()
      : NextResponse.json(
          {
            error: "Too many requests",
          },
          { status: 429 }
        );

    res.headers.set("X-RateLimit-Limit", limit.toString());
    res.headers.set("X-RateLimit-Remaining", remaining.toString());
    res.headers.set("X-RateLimit-Reset", reset.toString());

    return res;
  }

  return NextResponse.next();
};
