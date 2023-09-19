import { NextRequest, NextResponse } from "next/server";

import { getIp } from "@/lib/server-helpers";
import type { PostsResponse } from "@/lib/types";

import { getRecord, getValue } from "./db.helpers";
import { allPosts, allSnippets } from ".contentlayer/generated";

export const runtime = "nodejs";

type Options = {
  params: {
    slug: string;
  };
};

export const GET = async (request: NextRequest, { params }: Options) => {
  const slug = params.slug;
  const ip = getIp(request);

  if (
    !allPosts.map((post) => post.slug).includes(slug) &&
    !allSnippets.map((snippet) => snippet.slug).includes(slug)
  ) {
    return NextResponse.json(
      {
        error: "Not found",
      },
      {
        status: 404,
      },
    );
  }

  const record = await getRecord(slug);
  const value = await getValue(ip, slug);

  if (!record) {
    const response: PostsResponse = {
      slug,
      views: 0,
      upvotes: 0,
      userVotes: 0,
    };

    return NextResponse.json(response);
  }

  const response: PostsResponse = {
    ...record,
    userVotes: value,
  };
  return NextResponse.json(response);
};
