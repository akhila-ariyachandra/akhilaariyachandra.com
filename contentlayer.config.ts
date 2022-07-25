import a11yEmoji from "@fec/remark-a11y-emoji";
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import readingTime from "reading-time";
import rehypeCodeTitle from "rehype-code-title";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import externalLinks from "remark-external-links";
import remarkGfm from "remark-gfm";
import smartypants from "remark-smartypants";

const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: "posts/*.mdx",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    date: {
      type: "string",
      required: true,
    },
    updated: {
      type: "string",
      required: false,
    },
    description: {
      type: "string",
      required: true,
    },
    banner: {
      type: "string",
      required: true,
    },
    photographer: {
      type: "string",
      required: false,
    },
    unsplashLink: {
      type: "string",
      required: false,
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ""),
    },
    readingTime: {
      type: "string",
      resolve: (doc) => readingTime(doc.body.raw).text,
    },
  },
}));

const Snippet = defineDocumentType(() => ({
  name: "Snippet",
  filePathPattern: "snippets/*.mdx",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ""),
    },
  },
}));

const contentLayerConfig = makeSource({
  contentDirPath: "content",
  documentTypes: [Post, Snippet],
  mdx: {
    remarkPlugins: [smartypants, a11yEmoji, externalLinks, remarkGfm],
    rehypePlugins: [rehypeSlug, rehypeCodeTitle, rehypePrism],
  },
});

export default contentLayerConfig;
