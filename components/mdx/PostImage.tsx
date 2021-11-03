import Image from "next/image";
import type { FunctionComponent } from "react";

import styles from "@/components/mdx/PostImage.module.scss";

type Props = {
  src: string;
  width: number;
  height: number;
  title: string;
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
  credit,
}) => {
  return (
    <div className="grid place-items-center my-5">
      <Image
        src={src}
        width={width}
        height={height}
        className="rounded overflow-hidden"
        alt={title}
        title={title}
      />

      {credit && (
        <p className={styles.creditLink}>
          Credit -{" "}
          <a
            className="dark:text-green-500 text-green-800 font-roboto-slab font-semibold"
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
