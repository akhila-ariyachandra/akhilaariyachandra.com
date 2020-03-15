import React from "react";
import ReactMarkdown from "react-markdown";
import Image from "./Image";

type Props = {
  source: string;
};

const MarkdownContainer: React.FunctionComponent<Props> = ({ source }) => {
  return (
    <ReactMarkdown
      source={source}
      renderers={{
        image: ({ src, alt }) => <Image src={src} alt={alt} />,
      }}
    />
  );
};

export default MarkdownContainer;
