"use client";
import DashboardItem from "./DashboardItem";
import { useQuery } from "@tanstack/react-query";

interface APIResponse {
  count: number;
}

const TotalViews = () => {
  const { data } = useQuery({
    queryKey: ["total-views"],
    queryFn: () =>
      fetch("/views", { cache: "no-store" })
        .then((res) => res.json())
        .then((data) => data as APIResponse),
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
