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
    <div
      className="relative my-4 w-full not-prose mx-auto"
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
        className="absolute inset-1/2 rounded -translate-x-1/2 -translate-y-1/2"
      >
        <source src={`${asPath}/${name}.webm`} type="video/webm" />
        <source src={`${asPath}/${name}.mp4`} type="video/mp4" />
      </video>
    </div>
  );
};

export default Video;
