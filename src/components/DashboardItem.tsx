import React from "react";
import useSWR from "swr";
import Link from "next/link";
import { useSpring, animated } from "react-spring";
import { CgSpinner } from "react-icons/cg";

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
  const { data, isValidating } = useSWR(url, fetcher, {
    initialData: 0,
    revalidateOnMount: true,
  });
  const props = useSpring({
    number: data,
    from: { number: 0 },
  });

  return (
    <div className="grid gap-2 grid-cols-1">
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
        >
          {title}
        </a>
      )}

      <div className="flex flex-row items-center space-x-2">
        <animated.div className="dark:text-gray-200 text-gray-800 text-2xl font-normal">
          {props.number.interpolate((val: number) => Math.floor(val))}
        </animated.div>

        {isValidating && (
          <CgSpinner className="dark:text-gray-200 text-gray-800 text-xl animate-spin" />
        )}
      </div>
    </div>
  );
};

export default DashboardItem;
