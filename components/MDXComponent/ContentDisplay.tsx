"use client";

import { useMDXComponent } from "next-contentlayer/hooks";

import "@code-hike/mdx/dist/index.css";

// MDX Components
import CodeSandboxWrapper from "./CodeSandboxWrapper";
import Iframe from "./Iframe";
import PostImage from "./PostImage";
import SpecialBlock from "./SpecialBlock";
import Video from "./Video";

type ContentDisplayProps = {
  code: string;
};

const ContentDisplay = ({ code }: ContentDisplayProps) => {
  const Component = useMDXComponent(code);

  return (
    <Component
      components={{
        CodeSandboxWrapper,
        Iframe,
        PostImage,
        SpecialBlock,
        Video,
      }}
    />
  );
};

export default ContentDisplay;
