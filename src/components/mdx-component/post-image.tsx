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
      <img
        src={src}
        width={width}
        height={height}
        alt={title}
        title={title}
        className="mx-auto rounded-sm sm:rounded-md"
      />

      {credit && (
        <div className="mt-2 text-center text-sm text-zinc-700 sm:mt-3 sm:text-base dark:text-zinc-300">
          Credit -{" "}
          <a
            href={credit.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent dark:text-accent-dark font-medium hover:underline"
          >
            {credit.name}
          </a>
        </div>
      )}
    </div>
  );
};

export default PostImage;
