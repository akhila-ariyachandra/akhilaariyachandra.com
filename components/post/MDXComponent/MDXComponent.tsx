import classNames from "classnames";
import CodeSandboxWrapper from "./CodeSandboxWrapper";
import Iframe from "./Iframe";
import PostImage from "./PostImage";
import SpecialBlock from "./SpecialBlock";
import Video from "./Video";
import type { FC } from "react";
import { memo } from "react";
import { useMDXComponent } from "next-contentlayer/hooks";

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

export default memo(MDXComponent);
