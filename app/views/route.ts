import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
  const views = await prisma.views.aggregate({
    _sum: {
      count: true,
    },
  });

  return NextResponse.json({ count: views?._sum?.count ?? 0 });
};
