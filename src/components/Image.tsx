import React from "react";
import Img from "react-image";

type Props = {
  src: string;
  alt: string;
};

const Image: React.FunctionComponent<Props> = ({ src, alt }) => {
  return (
    <Img
      src={[`${src}?fm=webp`, `${src}?fm=jpg&fl=progressive`]}
      alt={alt}
      loading="lazy"
      style={{
        height: "auto",
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: "100%",
      }}
    />
  );
};

export default Image;
