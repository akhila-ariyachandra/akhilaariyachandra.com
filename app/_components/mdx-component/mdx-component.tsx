import { cn } from "@/_lib/helpers";
import { MDXContent } from "@content-collections/mdx/react";
import Link from "next/link";
import Callout from "./callout";
import PostImage from "./post-image";

type MDXComponentProps = {
  mdx: string;
  className?: string;
};

const MDXComponent = ({ mdx, className }: MDXComponentProps) => {
  return (
    <div
      className={cn(
        "prose prose-sm prose-zinc sm:prose-base dark:prose-invert max-w-none", // Base styles
        "prose-headings:font-display prose-headings:tracking-tighter", // Headings
        "prose-a:font-medium prose-a:text-accent prose-a:no-underline prose-a:hover:underline dark:prose-a:text-accent-dark", // Links
        className,
      )}
    >
      <MDXContent code={mdx} components={{ Callout, PostImage, a: Link }} />
    </div>
  );
};

export default MDXComponent;
