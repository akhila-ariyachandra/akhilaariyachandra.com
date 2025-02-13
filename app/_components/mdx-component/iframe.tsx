import type { IframeHTMLAttributes } from "react";

type IframeProps = {
  src: IframeHTMLAttributes<HTMLIFrameElement>["src"];
};

const Iframe = ({ src }: IframeProps) => {
  return (
    <iframe
      src={src}
      className="my-4 h-[500px] w-full overflow-hidden rounded-sm sm:my-5 sm:rounded-md"
      loading="lazy"
      sandbox=""
    />
  );
};

export default Iframe;
