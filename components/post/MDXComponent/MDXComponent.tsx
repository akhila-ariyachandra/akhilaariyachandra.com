import classNames from "classnames";
import type { FC } from "react";
import { memo } from "react";
import { useMDXComponent } from "next-contentlayer/hooks";
import { MDXComponents } from "@/components/mdx";

import "prism-themes/themes/prism-night-owl.css";
import styles from "./MDXComponent.module.scss";

type Props = {
  code: string;
};

const MDXComponent: FC<Props> = ({ code }) => {
  const Component = useMDXComponent(code);

  return (
    <div
      className={classNames(
        "prose prose-gray my-4 max-w-none font-sora prose-h1:mt-3.5 prose-headings:prose-a:no-underline dark:prose-invert",
        styles.customProse
      )}
    >
      <Component components={MDXComponents} />
    </div>
  );
};

export default memo(MDXComponent);
