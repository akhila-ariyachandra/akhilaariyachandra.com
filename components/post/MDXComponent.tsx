import type { FC } from "react";
import { useMDXComponent } from "next-contentlayer/hooks";
import { mdxComponents } from "@/lib/mdx";

type Props = {
  code: string;
};

const MDXComponent: FC<Props> = ({ code }) => {
  const Component = useMDXComponent(code);

  return (
    <div className="prose prose-gray dark:prose-invert prose-h1:mt-3.5 prose-headings:prose-a:no-underline max-w-none my-4 font-sora">
      <Component components={mdxComponents} />
    </div>
  );
};

export default MDXComponent;
