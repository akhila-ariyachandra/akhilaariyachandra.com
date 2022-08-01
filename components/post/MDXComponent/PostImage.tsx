import Image from "next/future/image";
import type { FunctionComponent } from "react";

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
    <div className="not-prose my-5 grid place-items-center">
      <Image
        src={src}
        width={width}
        height={height}
        className="overflow-hidden rounded"
        alt={title}
        title={title}
      />

      {credit && (
        <p className="mt-2">
          Credit -{" "}
          <a
            className="font-roboto-slab font-semibold text-emerald-800 dark:text-emerald-500"
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
