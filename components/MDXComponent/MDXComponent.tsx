"use client";

import CodeSandboxWrapper from "./CodeSandboxWrapper";
import Iframe from "./Iframe";
import PostImage from "./PostImage";
import SpecialBlock from "./SpecialBlock";
import Video from "./Video";
import { useMDXComponent } from "next-contentlayer/hooks";

import "@code-hike/mdx/dist/index.css";

interface MDXComponentProps {
  code: string;
}

const MDXComponent = ({ code }: MDXComponentProps) => {
  const Content = useMDXComponent(code);

  return (
    <div className="prose prose-sm prose-gray my-4 max-w-none font-display dark:prose-invert sm:prose-base prose-h1:mt-3.5 prose-a:text-emerald-700 prose-headings:prose-a:no-underline prose-a:dark:text-emerald-600">
      <Content
        components={{
          SpecialBlock,
          PostImage,
          CodeSandboxWrapper,
          Iframe,
          Video,
        }}
      />
    </div>
  );
};

export default MDXComponent;
