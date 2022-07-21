import { useRouter } from "next/router";
import React from "react";

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
      className="not-prose relative my-4 mx-auto w-full"
      style={{ aspectRatio: `${width} / ${height}`, maxWidth: width }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        width={width}
        height={height}
        title={title}
        className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 rounded"
      >
        <source src={`${asPath}/${name}.webm`} type="video/webm" />
        <source src={`${asPath}/${name}.mp4`} type="video/mp4" />
      </video>
    </div>
  );
};

export default Video;
