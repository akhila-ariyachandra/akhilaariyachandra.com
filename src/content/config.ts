import { defineCollection, z } from "astro:content";
import { rehypeExternalLinks } from "rehype-external-links";
import rehypePrettyCode from "rehype-pretty-code";

const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    posted: z.string(),
    updated: z.string().optional(),
  }),
});

const about = defineCollection({
  type: "content",
  schema: z.object({}),
});

export const collections = {
  posts,
  about,
};