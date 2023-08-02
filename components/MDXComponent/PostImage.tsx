import Image from "next/image";
import { cn } from "@/lib/helpers";

interface PostImageProps {
  src: string;
  width: number;
  height: number;
  title: string;
  credit?: {
    name: string;
    link: string;
  };
}

const PostImage = ({ src, width, height, title, credit }: PostImageProps) => {
  return (
    <div className="not-prose my-5 grid place-items-center">
      <Image
        src={src}
        width={width}
        height={height}
        className={cn("overflow-hidden", credit ? "rounded-t" : "rounded")}
        alt={title}
        title={title}
      />

      {credit && (
        <div className="w-full rounded-b bg-zinc-100 py-1 text-center font-display text-sm dark:bg-zinc-800 sm:text-base">
          Credit -{" "}
          <a
            className="font-semibold text-emerald-800 dark:text-emerald-500"
            href={credit.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {credit.name}
          </a>
        </div>
      )}
    </div>
  );
};

export default PostImage;
