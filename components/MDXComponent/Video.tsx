import { type FC } from "react";

interface VideoProps {
  path: string;
  title: string;
  height: number;
  width: number;
}

const Video: FC<VideoProps> = ({ path, width, height, title }) => {
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
        <source src={`${path}.webm`} type="video/webm" />
        <source src={`${path}.mp4`} type="video/mp4" />
      </video>
    </div>
  );
};

export default Video;
