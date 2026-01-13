import { cn } from "@/_lib/helpers";
import Image from "next/image";

type PostImageProps = {
  src: string;
  darkSrc?: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

const PostImage = ({
  src,
  darkSrc,
  alt,
  width,
  height,
  caption,
}: PostImageProps) => {
  const isDarkImageAvailable = !!darkSrc;

  return (
    <figure className="not-prose my-6 sm:my-8">
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        className={cn(
          "mx-auto rounded-sm sm:rounded-md",
          isDarkImageAvailable && "dark:hidden",
        )}
      />

      {isDarkImageAvailable && (
        <Image
          src={darkSrc}
          width={width}
          height={height}
          alt={alt}
          className="mx-auto hidden rounded-sm sm:rounded-md dark:block"
        />
      )}

      {caption && (
        <figcaption className="mt-2 text-center text-sm text-pretty text-zinc-700 sm:mt-3 sm:text-base dark:text-zinc-300">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default PostImage;
