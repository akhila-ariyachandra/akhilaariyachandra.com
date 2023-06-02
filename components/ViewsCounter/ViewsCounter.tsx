"use client";

import type { View } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

interface ViewsCounterProps {
  slug: string;
}

const ViewsCounter = ({ slug }: ViewsCounterProps) => {
  const { data } = useQuery({
    queryKey: ["views", slug],
    queryFn: () =>
      fetch(`/views/${slug}`, { cache: "no-store" }).then(
        (res) => res.json() as Promise<View>
      ),
    placeholderData: {
      slug,
      count: 0,
    },
  });

  return <>{data?.count}</>;
};

export default ViewsCounter;
