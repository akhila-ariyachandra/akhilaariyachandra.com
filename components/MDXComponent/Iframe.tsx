import type { IframeHTMLAttributes } from "react";

interface IframeProps {
  src: IframeHTMLAttributes<HTMLIFrameElement>["src"];
}

const Iframe = ({ src }: IframeProps) => {
  return (
    <iframe
      src={src}
      className="my-4 h-[500px] w-full overflow-hidden rounded"
      loading="lazy"
    />
  );
};

export default Iframe;
