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
    <div className="grid gap-2 grid-cols-1 place-content-center">
      {link.type === "internal" ? (
        <Link href={link.url}>
          <a className="flex flex-row dark:text-green-600 text-green-700 font-sora text-3xl font-medium">
            {title}
          </a>
        </Link>
      ) : (
        <a
          className="flex flex-row dark:text-green-600 text-green-700 font-sora text-3xl font-medium"
          target="_blank"
          rel="noopener noreferrer"
          href={link.url}
        >
          {title}
        </a>
      )}

      <div className="dark:text-gray-200 text-gray-800 font-roboto-slab text-2xl font-normal">
        {data}
      </div>
    </div>
  );
};

export default DashboardItem;
