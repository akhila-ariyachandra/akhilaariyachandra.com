"use client";

import type { View } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { getBaseURL } from "@/lib/helpers";

interface ViewsFetcherProps {
  slug: string;
}

const ViewsFetcher = ({ slug }: ViewsFetcherProps) => {
  const { data } = useQuery({
    queryKey: ["views", slug],
    queryFn: () =>
      fetch(`${getBaseURL()}/api/views/${slug}`, { cache: "no-store" }).then(
        (res) => res.json() as Promise<View>
      ),
    placeholderData: {
      slug,
      count: 0,
    },
    suspense: true,
  });

  return <>{data?.count}</>;
};

export default ViewsFetcher;
