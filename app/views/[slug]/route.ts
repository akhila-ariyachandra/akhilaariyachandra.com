import prisma from "@/prisma";
import redis from "@/lib/redis";
import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";

export const dynamic = "force-dynamic";

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(1, "60 s"), // 1 request per 60 seconds
  analytics: true,
});

interface Options {
  params: {
    slug: string;
  };
}

export const GET = async (request: Request, { params }: Options) => {
  const slug = params.slug;

  try {
    const views = await prisma.views.findUniqueOrThrow({
      where: {
        slug,
      },
    });

    return NextResponse.json(views);
  } catch {
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
};

export const POST = async (request: Request, { params }: Options) => {
  const slug = params.slug;

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

  const views = await prisma.views.upsert({
    create: {
      slug,
    },
    update: {
      count: {
        increment: 1,
      },
    },
    where: {
      slug,
    },
  });

  return NextResponse.json(views);
};
