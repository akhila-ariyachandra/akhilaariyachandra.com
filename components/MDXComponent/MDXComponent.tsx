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
        "my-4 max-w-none font-sora",
        "prose prose-gray dark:prose-invert prose-h1:mt-3.5 prose-headings:prose-a:no-underline",
        "prose-a:text-emerald-700 prose-a:dark:text-emerald-600",
        "prose-sm sm:prose-base",
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
