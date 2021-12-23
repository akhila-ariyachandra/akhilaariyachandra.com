import Image from "next/image";
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
    <div className="grid place-items-center my-5 not-prose">
      <Image
        src={src}
        width={width}
        height={height}
        className="rounded overflow-hidden"
        alt={title}
        title={title}
      />

      {credit && (
        <p className="mt-2">
          Credit -{" "}
          <a
            className="dark:text-emerald-500 text-emerald-800 font-roboto-slab font-semibold"
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
