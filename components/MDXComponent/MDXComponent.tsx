"use client";

import { useMDXComponent } from "next-contentlayer/hooks";
import { cn } from "@/lib/helpers";

import "@code-hike/mdx/dist/index.css";

// MDX Components
import Callout from "./Callout";
import CodeSandboxWrapper from "./CodeSandboxWrapper";
import Iframe from "./Iframe";
import PostImage from "./PostImage";
import Video from "./Video";

type MDXComponentProps = {
  code: string;
};

const MDXComponent = ({ code }: MDXComponentProps) => {
  const Component = useMDXComponent(code);

  return (
    <div
      className={cn(
        "prose prose-sm prose-zinc max-w-none sm:prose-base", // Base styles
        "prose-headings:font-display", // Headings
        "prose-a:font-medium prose-a:text-green-700", // Links
      )}
    >
      <Component
        components={{ Callout, CodeSandboxWrapper, Iframe, PostImage, Video }}
      />
    </div>
  );
};

export default MDXComponent;
