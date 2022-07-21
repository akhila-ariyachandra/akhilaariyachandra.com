import { mdxComponents } from "@/components/mdx";
import { useMDXComponent } from "next-contentlayer/hooks";
import { FC, memo } from "react";

import "prism-themes/themes/prism-night-owl.css";

type Props = {
  code: string;
};

const MDXComponent: FC<Props> = ({ code }) => {
  const Component = useMDXComponent(code);

  return (
    <div className="prose prose-gray my-4 max-w-none font-sora prose-h1:mt-3.5 prose-headings:prose-a:no-underline dark:prose-invert">
      <Component components={mdxComponents} />
    </div>
  );
};

export default memo(MDXComponent);
