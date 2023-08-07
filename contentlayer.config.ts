import readingTime from "reading-time";
import a11yEmoji from "@fec/remark-a11y-emoji";
import rehypeSlug from "rehype-slug";
import externalLinks from "rehype-external-links";
import remarkGfm from "remark-gfm";
import smartypants from "remark-smartypants";
import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from "contentlayer/source-files";
import { remarkCodeHike } from "@code-hike/mdx";

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
    banner: {
      type: "string",
      required: true,
    },
    unsplash: {
      type: "nested",
      of: defineNestedType(() => ({
        name: "Unsplash",
        fields: {
          photographer: {
            type: "string",
            required: true,
          },
          link: {
            type: "string",
            required: true,
          },
        },
      })),
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (post) => post._raw.sourceFileName.replace(".mdx", ""),
    },
    readingTime: {
      type: "string",
      resolve: (post) => readingTime(post.body.raw).text,
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

export const About = defineDocumentType(() => ({
  name: "About",
  filePathPattern: "about.mdx",
  contentType: "mdx",
  isSingleton: true,
}));

export const Career = defineDocumentType(() => ({
  name: "Career",
  filePathPattern: "career.yaml",
  contentType: "data",
  isSingleton: true,
  fields: {
    jobs: {
      type: "list",
      of: defineNestedType(() => ({
        name: "Job",
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
      })),
      required: true,
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post, About, Snippet, Career],
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
