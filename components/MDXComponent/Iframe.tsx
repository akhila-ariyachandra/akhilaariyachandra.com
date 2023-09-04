import type { IframeHTMLAttributes } from "react";

type IframeProps = {
  src: IframeHTMLAttributes<HTMLIFrameElement>["src"];
};

const Iframe = ({ src }: IframeProps) => {
  return (
    <iframe
      src={src}
      className="my-4 h-[500px] w-full overflow-hidden rounded sm:my-5 sm:rounded-md"
      loading="lazy"
    />
  );
};

export default Iframe;
