import a11yEmoji from "@fec/remark-a11y-emoji";
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeCodeTitle from "rehype-code-title";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import externalLinks from "remark-external-links";
import remarkGfm from "remark-gfm";
import smartypants from "remark-smartypants";

const About = defineDocumentType(() => ({
  name: "About",
  filePathPattern: "about.mdx",
  contentType: "mdx",
  isSingleton: true,
}));

const contentLayerConfig = makeSource({
  contentDirPath: "content",
  documentTypes: [About],
  mdx: {
    remarkPlugins: [smartypants, a11yEmoji, externalLinks, remarkGfm],
    rehypePlugins: [rehypeSlug, rehypeCodeTitle, rehypePrism],
  },
});

export default contentLayerConfig;
