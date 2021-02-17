import Image from "next/image";
import type { FunctionComponent } from "react";

type Props = {
  src: string;
  width: number;
  height: number;
  title: string;
  unoptimized?: boolean;
};

const PostImage: FunctionComponent<Props> = ({
  src,
  width,
  height,
  title,
  unoptimized = false,
}) => {
  return (
    <div className="pseudo-full-bleed grid place-items-center">
      <Image
        src={src}
        width={width}
        height={height}
        className="object-contain"
        alt={title}
        title={title}
        unoptimized={unoptimized}
      />
    </div>
  );
};

export default PostImage;
