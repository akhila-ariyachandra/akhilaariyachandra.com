import {
  defineLocations,
  type PresentationPluginOptions,
} from "sanity/presentation";

export const resolve: PresentationPluginOptions["resolve"] = {
  locations: {
    job: defineLocations({
      select: {},
      resolve: () => ({
        locations: [{ title: "Home", href: `/` }],
      }),
    }),
  },
};
