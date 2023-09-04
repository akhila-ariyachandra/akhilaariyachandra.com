import Image from "next/image";

type PostImageProps = {
  src: string;
  width: number;
  height: number;
  title: string;
  credit?: {
    name: string;
    link: string;
  };
};

const PostImage = ({ src, width, height, title, credit }: PostImageProps) => {
  return (
    <div className="not-prose my-6 sm:my-8">
      <Image
        src={src}
        width={width}
        height={height}
        alt={title}
        title={title}
        className="rounded sm:rounded-md"
      />

      {credit && (
        <div className="text-center text-sm text-zinc-700 sm:text-base">
          Credit -{" "}
          <a
            href={credit.link}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-green-700 hover:underline"
          >
            {credit.name}
          </a>
        </div>
      )}
    </div>
  );
};

export default PostImage;
