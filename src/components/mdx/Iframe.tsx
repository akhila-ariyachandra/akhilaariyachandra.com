import React from "react";
import LazyLoad from "react-lazyload";

const IFRAME_HEIGHT = 500;

type Props = {
  url: string;
};

const Iframe: React.FunctionComponent<Props> = ({ url }) => {
  return (
    <div className="full-bleed my-4 rounded overflow-hidden">
      <LazyLoad height={IFRAME_HEIGHT} offset={500} once>
        <iframe
          src={url}
          className="w-full"
          style={{ height: IFRAME_HEIGHT }}
        />
      </LazyLoad>
    </div>
  );
};

export default Iframe;
