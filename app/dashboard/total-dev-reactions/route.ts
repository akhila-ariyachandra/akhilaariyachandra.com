import { NextResponse } from "next/server";
import { getDevTotalReactions } from "@/lib/dev";

export const GET = async () => {
  const totalReactions = await getDevTotalReactions();

  return NextResponse.json({ count: totalReactions });
};
