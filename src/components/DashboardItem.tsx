import React from "react";
import Link from "next/link";
import { useSpring, animated } from "react-spring";

type Props = {
  title: string;
  link: {
    url: string;
    type: "internal" | "external";
  };
  value: number;
};

const DashboardItem: React.FunctionComponent<Props> = ({
  title,
  link,
  value,
}) => {
  const props = useSpring({
    number: value,
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

      <animated.div className="text-black dark:text-white text-2xl font-normal">
        {props.number.interpolate((val: number) => Math.floor(val))}
      </animated.div>
    </div>
  );
};

export default DashboardItem;
