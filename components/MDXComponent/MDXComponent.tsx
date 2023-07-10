import classNames from "classnames";
import CodeSandboxWrapper from "./CodeSandboxWrapper";
import Iframe from "./Iframe";
import PostImage from "./PostImage";
import SpecialBlock from "./SpecialBlock";
import Video from "./Video";
import { getMDXComponent } from "next-contentlayer/hooks";

import "prism-themes/themes/prism-night-owl.css";
import styles from "./MDXComponent.module.scss";

interface MDXComponentProps {
  code: string;
}

const MDXComponent = ({ code }: MDXComponentProps) => {
  const Content = getMDXComponent(code);

  return (
    <div
      className={classNames(
        "prose prose-sm prose-gray my-4 max-w-none font-display dark:prose-invert sm:prose-base prose-h1:mt-3.5 prose-a:text-emerald-700 prose-headings:prose-a:no-underline prose-a:dark:text-emerald-600",
        styles.customProse
      )}
    >
      <Content
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
