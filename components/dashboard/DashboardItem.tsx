import React from "react";
import Link from "next/link";
import { useQuery } from "react-query";
import { fetcher } from "@/lib/helpers";

type Props = {
  title: string;
  link: {
    url: string;
    type: "internal" | "external";
  };
  queryKey: string;
  url: string;
};

const DashboardItem: React.FunctionComponent<Props> = ({
  title,
  link,
  queryKey,
  url,
}) => {
  const { data } = useQuery<number, Error>(
    ["dashboard", queryKey],
    () => fetcher(url),
    {
      placeholderData: 0,
    }
  );

  return (
    <div className="grid grid-cols-1 place-content-center gap-2">
      {link.type === "internal" ? (
        <Link href={link.url}>
          <a className="flex flex-row font-sora text-3xl font-medium text-emerald-700 dark:text-emerald-600">
            {title}
          </a>
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

      <div className="font-roboto-slab text-2xl font-normal text-gray-800 dark:text-gray-200">
        {data}
      </div>
    </div>
  );
};

export default DashboardItem;
