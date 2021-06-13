import Image from "next/image";
import type { FunctionComponent } from "react";

import styles from "@/components/mdx/PostImage.module.scss";

type Props = {
  src: string;
  width: number;
  height: number;
  title: string;
  unoptimized?: boolean;
  fullBleed?: boolean;
  credit?: {
    name: string;
    link: string;
  };
};

const PostImage: FunctionComponent<Props> = ({
  src,
  width,
  height,
  title,
  unoptimized = false,
  fullBleed = true,
  credit,
}) => {
  return (
    <div
      className={`${
        fullBleed ? "pseudo-full-bleed" : ""
      } grid place-items-center my-5`}
    >
      <Image
        src={src}
        width={width}
        height={height}
        className="rounded-md overflow-hidden"
        alt={title}
        title={title}
        unoptimized={unoptimized}
      />

      {credit && (
        <p className={styles.creditLink}>
          Credit -{" "}
          <a
            className="dark:text-green-500 text-green-800 font-semibold"
            href={credit.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {credit.name}
          </a>
        </p>
      )}
    </div>
  );
};

export default PostImage;
