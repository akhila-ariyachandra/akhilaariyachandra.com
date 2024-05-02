import { cn } from "@/_utils/helpers";
import { getMDXComponent } from "next-contentlayer/hooks";
import Callout from "./callout";
import CodeSandboxWrapper from "./code-sandbox-wrapper";
import Iframe from "./iframe";
import PostImage from "./post-image";
import Video from "./video";

type MDXComponentProps = {
  code: string;
};

const MDXComponent = ({ code }: MDXComponentProps) => {
  const Component = getMDXComponent(code);

  return (
    <div
      className={cn(
        "prose prose-sm prose-zinc max-w-none dark:prose-invert sm:prose-base", // Base styles
        "prose-headings:font-display prose-headings:tracking-tighter", // Headings
        "prose-a:font-medium prose-a:text-green-700 prose-a:no-underline hover:prose-a:underline dark:prose-a:text-green-500", // Links
      )}
    >
      <Component
        components={{ Callout, CodeSandboxWrapper, Iframe, PostImage, Video }}
      />
    </div>
  );
};

export default MDXComponent;
