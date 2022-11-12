"use client";

import classNames from "classnames";
import Link from "next/link";
import type { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/helpers";

interface APIResponse {
  count: number;
}

interface DashboardItemProps {
  title: string;
  link: {
    url: string;
    type: "internal" | "external";
  };
  queryKey: string;
  url: string;
}

const DashboardItem: FC<DashboardItemProps> = ({
  title,
  link,
  queryKey,
  url,
}) => {
  const { data } = useQuery<APIResponse>({
    queryKey: ["dashboard", queryKey, url],
    queryFn: () => fetcher(url),
    placeholderData: { count: 0 },
  });

  return (
    <div
      className={classNames(
        "grid-cols-1",
        "grid place-content-center gap-2",
        "rounded-md border-2 border-zinc-600 p-2 dark:border-zinc-300"
      )}
    >
      {link.type === "internal" ? (
        <Link
          href={link.url}
          className="flex flex-row font-sora text-3xl font-medium text-emerald-700 dark:text-emerald-600"
        >
          {title}
        </Link>
      ) : (
        <a
          className="flex flex-row font-sora text-3xl font-medium text-emerald-700 dark:text-emerald-600"
          target="_blank"
          rel="noopener noreferrer"
          href={link.url}
        >
          {title}
        </a>
      )}

      <div className="font-roboto-slab text-2xl font-normal text-zinc-800 dark:text-zinc-200">
        {data?.count}
      </div>
    </div>
  );
};

export default DashboardItem;
