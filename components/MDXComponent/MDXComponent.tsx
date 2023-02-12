"use client";

import classNames from "classnames";
import CodeSandboxWrapper from "./CodeSandboxWrapper";
import Iframe from "./Iframe";
import PostImage from "./PostImage";
import SpecialBlock from "./SpecialBlock";
import Video from "./Video";
import type { FC } from "react";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { MDXRemote } from "next-mdx-remote";

import "prism-themes/themes/prism-night-owl.css";
import styles from "./MDXComponent.module.scss";

interface MDXComponentProps {
  source: MDXRemoteSerializeResult;
}

const MDXComponent: FC<MDXComponentProps> = ({ source }) => {
  return (
    <div
      className={classNames(
        "my-4 max-w-none font-sora",
        "prose prose-gray dark:prose-invert prose-h1:mt-3.5 prose-headings:prose-a:no-underline",
        "prose-a:text-emerald-700 prose-a:dark:text-emerald-600",
        "prose-sm sm:prose-base",
        styles.customProse
      )}
    >
      <MDXRemote
        {...source}
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
