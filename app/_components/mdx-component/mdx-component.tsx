import { cn } from "@/_utils/helpers";
import { MDXContent } from "@content-collections/mdx/react";
import Callout from "./callout";
import CodeSandboxWrapper from "./code-sandbox-wrapper";
import Iframe from "./iframe";
import PostImage from "./post-image";
import Video from "./video";

type MDXComponentProps = {
  mdx: string;
  className?: string;
};

const MDXComponent = ({ mdx, className }: MDXComponentProps) => {
  return (
    <div
      className={cn(
        "prose prose-sm prose-zinc max-w-none sm:prose-base dark:prose-invert", // Base styles
        "prose-headings:font-display prose-headings:tracking-tighter", // Headings
        "prose-a:font-medium prose-a:text-green-700 prose-a:no-underline hover:prose-a:underline dark:prose-a:text-green-500", // Links
        className,
      )}
    >
      <MDXContent
        code={mdx}
        components={{ Callout, CodeSandboxWrapper, Iframe, PostImage, Video }}
      />
    </div>
  );
};

export default MDXComponent;
