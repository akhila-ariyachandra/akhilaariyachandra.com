import {
  defineDocuments,
  defineLocations,
  type PresentationPluginOptions,
} from "sanity/presentation";

export const resolve: PresentationPluginOptions["resolve"] = {
  mainDocuments: defineDocuments([
    {
      route: "/blog/:slug",
      filter: "_type == 'post' && slug.current == $slug",
    },
  ]),
  locations: {
    job: defineLocations({
      select: {},
      resolve: () => ({
        locations: [{ title: "Home", href: `/` }],
      }),
    }),
  },
};
