import React from "react";
import Img from "react-image";

type Props = {
  src: string;
  alt: string;
};

const BannerImage: React.FunctionComponent<Props> = ({ src, alt }) => {
  return (
    <div id="banner-container">
      <Img
        src={[`${src}?fm=webp`, `${src}?fm=jpg&fl=progressive`]}
        alt={alt}
        loading="lazy"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "auto",
          width: "100%",
        }}
      />

      <style jsx>{`
        #banner-container {
          position: relative;
          height: 0;
          padding-top: calc(600 / 1200 * 100%);
        }
      `}</style>
    </div>
  );
};

export default BannerImage;
