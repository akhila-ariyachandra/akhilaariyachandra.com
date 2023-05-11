"use client";

import type { FC } from "react";
import type { View } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

interface ViewsCounterProps {
  slug: string;
}

const ViewsCounter: FC<ViewsCounterProps> = ({ slug }) => {
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
