"use client";

import DashboardItem from "./DashboardItem";
import type { ComponentProps } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBaseURL } from "@/lib/helpers";

type TotalViewsProps = {
  /**
   * Props to pass to the `<DashboardItem />` component
   */
  dashboardItemProps: Omit<ComponentProps<typeof DashboardItem>, "value">;
};

type APIResponse = {
  count: number;
};

const TotalViews = ({ dashboardItemProps }: TotalViewsProps) => {
  const { data } = useQuery({
    queryKey: ["total-views"],
    queryFn: () =>
      fetch(`${getBaseURL()}/api/views`, { cache: "no-store" })
        .then((res) => res.json())
        .then((data) => data as APIResponse),
    placeholderData: { count: 0 },
    suspense: true,
  });

  return <DashboardItem {...dashboardItemProps} value={data?.count} />;
};

export default TotalViews;
