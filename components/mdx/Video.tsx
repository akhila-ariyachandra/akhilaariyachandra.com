import React from "react";
import { useRouter } from "next/router";

type Props = {
  name: string;
  title: string;
  height: number;
  width: number;
};

const Video: React.FC<Props> = ({ name, width, height, title }) => {
  const { asPath } = useRouter();

  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      width={width}
      height={height}
      title={title}
      className="mx-auto rounded"
    >
      <source src={`${asPath}/${name}.webm`} type="video/webm" />
      <source src={`${asPath}/${name}.mp4`} type="video/mp4" />
    </video>
  );
};

export default Video;
