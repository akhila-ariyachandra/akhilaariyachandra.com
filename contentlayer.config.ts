import a11yEmoji from "@fec/remark-a11y-emoji";
import rehypeSlug from "rehype-slug";
import externalLinks from "rehype-external-links";
import remarkGfm from "remark-gfm";
import smartypants from "remark-smartypants";
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import { remarkCodeHike } from "@code-hike/mdx";

export const About = defineDocumentType(() => ({
  name: "About",
  filePathPattern: "about.mdx",
  contentType: "mdx",
  isSingleton: true,
}));

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: "posts/*.mdx",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    posted: {
      type: "date",
      required: true,
    },
    updated: {
      type: "date",
    },
    description: {
      type: "string",
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (post) => post._raw.sourceFileName.replace(".mdx", ""),
    },
  },
}));

export const Snippet = defineDocumentType(() => ({
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
      resolve: (post) => post._raw.sourceFileName.replace(".mdx", ""),
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [About, Post, Snippet],
  mdx: {
    remarkPlugins: [
      smartypants,
      a11yEmoji,
      remarkGfm,
      [remarkCodeHike, { theme: "material-ocean", showCopyButton: true }],
    ],
    rehypePlugins: [
      rehypeSlug,
      [externalLinks, { target: "_blank", rel: ["noopener", "noreferrer"] }],
    ],
  },
});
