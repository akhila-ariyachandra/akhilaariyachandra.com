import React from "react";
import Link from "next/link";
import { useQuery } from "react-query";

const fetcher = (url) => fetch(url).then((r) => r.json());

type Props = {
  title: string;
  link: {
    url: string;
    type: "internal" | "external";
  };
  url: string;
};

const DashboardItem: React.FunctionComponent<Props> = ({
  title,
  link,
  url,
}) => {
  const { data } = useQuery(["dashboardItem", url], () => fetcher(url));

  return (
    <div className="grid gap-2 grid-cols-1 place-content-center">
      {link.type === "internal" ? (
        <Link href={link.url}>
          <a className="flex flex-row dark:text-green-600 text-green-700 text-3xl font-medium">
            {title}
          </a>
        </Link>
      ) : (
        <a
          className="flex flex-row dark:text-green-600 text-green-700 text-3xl font-medium"
          target="_blank"
          rel="noopener noreferrer"
          href={link.url}
        >
          {title}
        </a>
      )}

      <div className="dark:text-gray-200 text-gray-800 text-2xl font-normal">
        {data}
      </div>
    </div>
  );
};

export default DashboardItem;
