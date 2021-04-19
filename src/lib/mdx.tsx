import SpecialBlock from "@/components/mdx/SpecialBlock";
import Code from "@/components/mdx/Code";
import PostImage from "@/components/mdx/PostImage";
import CodeSandboxWrapper from "@/components/mdx/CodeSandboxWrapper";
import Iframe from "@/components/mdx/Iframe";

export const mdxComponents = {
  SpecialBlock,
  pre: (props) => <Code {...props} />,
  PostImage,
  CodeSandboxWrapper,
  Iframe,
};
