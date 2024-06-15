import a11yEmoji from "@fec/remark-a11y-emoji";
import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from "contentlayer2/source-files";
import externalLinks from "rehype-external-links";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import smartypants from "remark-smartypants";

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
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (post) => post._raw.sourceFileName.replace(".mdx", ""),
    },
  },
}));

export const Job = defineDocumentType(() => ({
  name: "Job",
  filePathPattern: "jobs/*.mdx",
  contentType: "mdx",
  fields: {
    position: {
      type: "string",
      required: true,
    },
    company: {
      type: "nested",
      required: true,
      of: defineNestedType(() => ({
        name: "Company",
        fields: {
          name: {
            type: "string",
            required: true,
          },
          link: {
            type: "string",
            required: true,
          },
          logo: {
            type: "string",
            required: true,
          },
        },
      })),
    },
    period: {
      type: "nested",
      required: true,
      of: defineNestedType(() => ({
        name: "Period",
        fields: {
          start: {
            type: "date",
            required: true,
          },
          end: {
            type: "date",
          },
        },
      })),
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [About, Post, Job],
  mdx: {
    remarkPlugins: [smartypants, a11yEmoji, remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [externalLinks, { target: "_blank", rel: ["noopener", "noreferrer"] }],
      [
        rehypePrettyCode,
        {
          theme: "material-theme-ocean",
          filterMetaString: (string) => string.replace(/filename="[^"]*"/, ""),
        } satisfies Options,
      ],
    ],
  },
});
