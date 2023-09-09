"use client";

import type { Post } from "@/db/schema";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getBaseURL } from "@/lib/helpers";

type ViewsFetcherProps = {
  slug: string;
};

const ViewsFetcher = ({ slug }: ViewsFetcherProps) => {
  const { data } = useSuspenseQuery({
    queryKey: ["views", slug],
    queryFn: () =>
      fetch(`${getBaseURL()}/api/views/${slug}`, { cache: "no-cache" })
        .then((res) => res.json())
        .then((data) => data as Post),
  });

  return data.views;
};

export default ViewsFetcher;
