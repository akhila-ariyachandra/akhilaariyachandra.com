import dynamic from "next/dynamic";
const SpecialBlock = dynamic(() => import("@/components/post/SpecialBlock"));
const Code = dynamic(() => import("@/components/code/Code"));
const PostImage = dynamic(() => import("@/components/post/PostImage"));
const CodeSandboxWrapper = dynamic(
  () => import("@/components/post/CodeSandboxWrapper")
);
const Iframe = dynamic(() => import("@/components/post/Iframe"));

export const mdxComponents = {
  SpecialBlock,
  pre: (props) => <Code {...props} />,
  PostImage,
  CodeSandboxWrapper,
  Iframe,
};
