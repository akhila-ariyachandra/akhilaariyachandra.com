import dynamic from "next/dynamic";
import SpecialBlock from "@/components/mdx/SpecialBlock";
import Code from "@/components/mdx/Code";
import PostImage from "@/components/mdx/PostImage";
const CodeSandboxWrapper = dynamic(
  () => import("@/components/mdx/CodeSandboxWrapper")
);
import Iframe from "@/components/mdx/Iframe";
import Video from "@/components/mdx/Video";
import Reactions from "@/components/post/Reactions";

export const mdxComponents = {
  SpecialBlock,
  pre: Code,
  PostImage,
  CodeSandboxWrapper,
  Iframe,
  Video,
  Reactions,
};
