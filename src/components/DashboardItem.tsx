import React from "react";
import Link from "next/link";
import { useSpring, animated } from "react-spring";
import { FaExternalLinkAlt } from "react-icons/fa";

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
    <div className="p-2 border-2 border-gray-400 border-opacity-50 rounded-md">
      {link.type === "internal" ? (
        <Link href={link.url}>
          <a className="flex flex-row text-black dark:text-white text-3xl font-medium">
            {title}
            <FaExternalLinkAlt className="ml-2 text-xl" />
          </a>
        </Link>
      ) : (
        <a
          className="flex flex-row text-black dark:text-white text-3xl font-medium"
          target="_blank"
          rel="noopener noreferrer"
        >
          {title}
          <FaExternalLinkAlt className="ml-2 text-xl" />
        </a>
      )}

      <animated.div className="text-black dark:text-white text-2xl font-normal">
        {props.number.interpolate((val: number) => Math.floor(val))}
      </animated.div>
    </div>
  );
};

export default DashboardItem;
