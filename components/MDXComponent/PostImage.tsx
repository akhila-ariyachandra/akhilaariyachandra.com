import Image from "next/image";

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
    <div>
      <Image
        src={src}
        width={width}
        height={height}
        alt={title}
        title={title}
      />

      {credit && (
        <div>
          Credit -{" "}
          <a href={credit.link} target="_blank" rel="noopener noreferrer">
            {credit.name}
          </a>
        </div>
      )}
    </div>
  );
};

export default PostImage;
