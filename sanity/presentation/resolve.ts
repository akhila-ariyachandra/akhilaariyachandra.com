import {
  defineDocuments,
  defineLocations,
  type PresentationPluginOptions,
} from "sanity/presentation";
import { z } from "zod";

export const resolve: PresentationPluginOptions["resolve"] = {
  mainDocuments: defineDocuments([
    {
      route: "/blog/:slug",
      filter: "_type == 'post' && slug.current == $slug",
    },
    {
      route: "/blog/archive/:slug",
      filter: "_type == 'post' && slug.current == $slug",
    },
  ]),
  locations: {
    post: defineLocations({
      select: {
        title: "title",
        slug: "slug.current",
        archived: "archived",
      },
      resolve: (doc) => {
        const { title, slug, archived } = z
          .object({
            title: z.string().optional(),
            slug: z.string().optional(),
            archived: z.boolean().optional(),
          })
          .parse(doc);

        if (!slug) {
          return null;
        }

        return {
          locations: archived
            ? [
                { title: title ?? "Untitled", href: `/blog/archive/${slug}` },
                { title: "Archived Blog", href: "/blog/archive" },
              ]
            : [
                { title: title ?? "Untitled", href: `/blog/${slug}` },
                { title: "Blog", href: "/blog" },
              ],
        };
      },
    }),
    personalInfo: defineLocations({
      select: {},
      resolve: () => ({
        locations: [{ title: "Home", href: `/` }],
      }),
    }),
    job: defineLocations({
      select: {},
      resolve: () => ({
        locations: [{ title: "Home", href: `/` }],
      }),
    }),
  },
};
