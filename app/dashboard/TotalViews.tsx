"use client";
import ky from "ky";
import DashboardItem from "./DashboardItem";
import type { FC } from "react";
import { useQuery } from "@tanstack/react-query";

interface APIResponse {
  count: number;
}

const TotalViews: FC = () => {
  const { data } = useQuery({
    queryKey: ["total-views"],
    queryFn: () => ky.get("/views", { cache: "no-store" }).json<APIResponse>(),
    placeholderData: { count: 0 },
  });

  return (
    <DashboardItem
      title="Total Views"
      link={{ type: "internal", url: "/blog" }}
      value={data?.count}
    />
  );
};

export default TotalViews;
