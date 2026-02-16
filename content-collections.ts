import {
  defineCollection,
  defineConfig,
  defineSingleton,
} from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { type } from "arktype";
import externalLinks from "rehype-external-links";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";

const PostSchema = type({
  title: "string",
  "description?": "string <= 140",
  posted: "string",
  "updated?": "string",
  content: "string",
});

const Post = defineCollection({
  name: "Post",
  directory: "content/posts",
  include: "*.mdx",
  schema: PostSchema,
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
  schema: PostSchema,
});

const About = defineSingleton({
  name: "About",
  filePath: "content/about.mdx",
  schema: type({
    content: "string",
  }),
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
