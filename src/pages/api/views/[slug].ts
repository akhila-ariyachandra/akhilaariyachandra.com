import type { APIRoute } from "astro";
import prisma from "../../../lib/prisma";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(1, "60 s"),
  analytics: true,
});

export const GET: APIRoute = async ({ params, request }) => {
  const slug = params.slug;

  if (!slug) {
    return new Response(JSON.stringify({ error: "Slug is required" }), {
      status: 400,
    });
  }

  const result = await prisma.post.findFirst({
    where: {
      slug,
    },
  });

  return new Response(
    JSON.stringify({ views: result?.views ?? 0 }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};

export const POST: APIRoute = async ({ params, request }) => {
  const slug = params.slug;

  if (!slug) {
    return new Response(JSON.stringify({ error: "Slug is required" }), {
      status: 400,
    });
  }

  if (import.meta.env.PROD) {
    const headers = request.headers;
    let ip = "";

    const FALLBACK_IP_ADDRESS = "0.0.0.0";
    const forwardedFor = headers.get("x-forwarded-for");

    if (forwardedFor) {
      ip = forwardedFor.split(",")[0] ?? FALLBACK_IP_ADDRESS;
    } else {
      ip = headers.get("x-real-ip") ?? FALLBACK_IP_ADDRESS;
    }

    const { success } = await ratelimit.limit(`${ip}-${slug}`);

    if (!success) {
      return new Response(JSON.stringify({ error: "Rate limited" }), {
        status: 429,
      });
    }
  }

  await prisma.post.upsert({
    create: {
      slug,
    },
    update: {
      views: {
        increment: 1,
      },
    },
    where: {
      slug,
    },
  });

  const result = await prisma.post.findFirst({
    where: {
      slug,
    },
  });

  return new Response(
    JSON.stringify({ views: result?.views ?? 0 }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};