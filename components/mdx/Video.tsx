import React from "react";
import { useRouter } from "next/router";

import styles from "./Video.module.scss";

type Props = {
  name: string;
  title: string;
  height: number;
  width: number;
};

const Video: React.FC<Props> = ({ name, width, height, title }) => {
  const { asPath } = useRouter();

  return (
    <div
      className="relative my-4 w-full"
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        width={width}
        height={height}
        title={title}
        className={styles.video}
      >
        <source src={`${asPath}/${name}.webm`} type="video/webm" />
        <source src={`${asPath}/${name}.mp4`} type="video/mp4" />
      </video>
    </div>
  );
};

export default Video;
