import React from "react";
import ReactMarkdown from "react-markdown";
import Image from "./Image";
import CodeBlock from "./CodeBlock";

type Props = {
  source: string;
};

const MarkdownContainer: React.FunctionComponent<Props> = ({ source }) => {
  return (
    <ReactMarkdown
      source={source}
      renderers={{
        image: Image,
        code: CodeBlock,
      }}
      escapeHtml={false}
    />
  );
};

export default MarkdownContainer;
