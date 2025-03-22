import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import externalLinks from "rehype-external-links";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";

const Post = defineCollection({
  name: "Post",
  directory: "content/posts",
  include: "*.mdx",
  schema: (z) => ({
    title: z.string(),
    description: z.string().optional(),
    posted: z.string(),
    updated: z.string().optional(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      rehypePlugins: [
        [externalLinks, { target: "_blank", rel: ["noopener", "noreferrer"] }],
        [
          rehypePrettyCode,
          {
            theme: "material-theme-ocean",
            filterMetaString: (string) =>
              string.replace(/filename="[^"]*"/, ""),
          } satisfies Options,
        ],
      ],
    });

    return {
      ...document,
      mdx,
    };
  },
});

const NoBodyPost = defineCollection({
  name: "NoBodyPost",
  directory: "content/posts",
  include: "*.mdx",
  schema: (z) => ({
    title: z.string(),
    description: z.string().max(140).optional(),
    posted: z.string(),
    updated: z.string().optional(),
  }),
});

const About = defineCollection({
  name: "About",
  directory: "content",
  include: "about.mdx",
  schema: () => ({}),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      rehypePlugins: [
        [externalLinks, { target: "_blank", rel: ["noopener", "noreferrer"] }],
      ],
    });
    return {
      ...document,
      mdx,
    };
  },
});

export default defineConfig({
  collections: [Post, NoBodyPost, About],
});
