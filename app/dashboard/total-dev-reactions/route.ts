import type { DEVArticle } from "@/lib/types";
import { NextResponse } from "next/server";

export const GET = async () => {
  const response = await fetch("https://dev.to/api/articles/me/published", {
    headers: {
      "api-key": process.env.DEV_API_KEY as string,
    },
    next: {
      revalidate: 86400,
    },
  });
  const data = (await response.json()) as DEVArticle[];

  const totalReactions = data.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.public_reactions_count,
    0
  );

  return NextResponse.json({ count: totalReactions });
};
