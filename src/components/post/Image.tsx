import Image from "next/image";
import { FunctionComponent } from "react";

type Props = {
  path: string;
  title: string;
};

const PostImage: FunctionComponent<Props> = ({ path, title }) => {
  return (
    <Image
      src={path}
      alt={title}
      title={title}
      className="rounded sm:rounded-md"
      width={1200}
      height={630}
    />
  );
};

export default PostImage;
