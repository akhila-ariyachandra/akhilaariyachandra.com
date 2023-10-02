"use client";

import { useQuery } from "@tanstack/react-query";
import ky from "ky";
import { getBaseURL } from "@/lib/helpers";

import type { PostsTotalResponse } from "@/lib/types";

type TotalsDisplayProps = {
  views: number;
  upvotes: number;
};

export const TotalsDisplay = ({ views, upvotes }: TotalsDisplayProps) => {
  return (
    <span className="font-light text-zinc-600 dark:text-zinc-400">{`(${views} post views, ${upvotes} upvotes)`}</span>
  );
};

const BlogTotals = () => {
  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: () => ky(`${getBaseURL()}/api/posts`).json<PostsTotalResponse>(),
    suspense: true,
  });

  return (
    <TotalsDisplay views={data?.views ?? 0} upvotes={data?.upvotes ?? 0} />
  );
};

export default BlogTotals;
