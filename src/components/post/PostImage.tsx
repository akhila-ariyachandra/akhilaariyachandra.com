import Image from "next/image";
import type { FunctionComponent } from "react";

import styles from "src/components/post/PostImage.module.scss";

type Props = {
  src: string;
  width: number;
  height: number;
  title: string;
};

const PostImage: FunctionComponent<Props> = ({ src, width, height, title }) => {
  return (
    <div className="py-8">
      <Image
        src={src}
        width={width}
        height={height}
        className={styles.postImage}
        alt={title}
        title={title}
        layout="responsive"
      />
    </div>
  );
};

export default PostImage;
