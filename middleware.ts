import redis from "@/lib/redis";
import { type NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(1, "60 s"), // 1 request per 60 seconds
  analytics: true,
});

export const config = {
  matcher: "/views/:slug*",
};

export const middleware = async (request: NextRequest) => {
  // Limit blog post views increment
  if (request.method === "POST") {
    const ip =
      request.headers["x-real-ip"] ??
      request.headers["x-forwarded-for"] ??
      "localhost:3000";

    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return NextResponse.json(
        {
          error: "Too many requests",
        },
        { status: 429 }
      );
    }
  }

  return NextResponse.next();
};
