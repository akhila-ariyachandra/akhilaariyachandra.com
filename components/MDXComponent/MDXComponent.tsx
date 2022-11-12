"use import";

import classNames from "classnames";
import CodeSandboxWrapper from "./CodeSandboxWrapper";
import Iframe from "./Iframe";
import PostImage from "./PostImage";
import SpecialBlock from "./SpecialBlock";
import Video from "./Video";
import type { FC } from "react";
import { useMDXComponent } from "next-contentlayer/hooks";

import "prism-themes/themes/prism-night-owl.css";
import styles from "./MDXComponent.module.scss";

interface MDXComponentProps {
  code: string;
}

const MDXComponent: FC<MDXComponentProps> = ({ code }) => {
  const Component = useMDXComponent(code);

  return (
    <div
      className={classNames(
        "my-4 max-w-none font-sora",
        "prose prose-gray prose-h1:mt-3.5 prose-headings:prose-a:no-underline dark:prose-invert",
        "prose-a:text-emerald-700 prose-a:dark:text-emerald-600",
        styles.customProse
      )}
    >
      <Component
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
