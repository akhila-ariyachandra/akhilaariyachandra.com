import prisma from "@/prisma";
import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface Options {
  params: {
    slug: string;
  };
}

export const GET = async (request: NextRequest, { params }: Options) => {
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

export const POST = async (request: NextRequest, { params }: Options) => {
  const slug = params.slug;

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
