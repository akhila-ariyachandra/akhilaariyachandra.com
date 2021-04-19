import SpecialBlock from "@/components/post/SpecialBlock";
import Code from "@/components/code/Code";
import PostImage from "@/components/post/PostImage";
import CodeSandboxWrapper from "@/components/post/CodeSandboxWrapper";
import Iframe from "@/components/post/Iframe";

export const mdxComponents = {
  SpecialBlock,
  pre: (props) => <Code {...props} />,
  PostImage,
  CodeSandboxWrapper,
  Iframe,
};
