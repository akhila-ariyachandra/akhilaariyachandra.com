import { NextResponse } from "next/server";
import { getDevTotalViews } from "@/lib/dev";

export const GET = async () => {
  const totalViews = await getDevTotalViews();

  return NextResponse.json({ count: totalViews });
};
