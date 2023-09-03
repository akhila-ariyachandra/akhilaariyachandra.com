interface VideoProps {
  paths: {
    webm: string;
    mp4: string;
  };
  title: string;
  height: number;
  width: number;
}

const Video = ({ paths, width, height, title }: VideoProps) => {
  return (
    <div
      className="not-prose relative mx-auto w-full"
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
        className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <source src={paths.webm} type="video/webm" />
        <source src={paths.mp4} type="video/mp4" />
      </video>
    </div>
  );
};

export default Video;
