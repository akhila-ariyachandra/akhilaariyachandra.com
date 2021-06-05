import { objectType, extendType } from "nexus";
import {
  getTotalViews,
  getTotalReactions,
  getTotalDevViews,
  getTotalDevReactions,
  getMostPopularPosts,
} from "@/lib/dashboard";
import "apollo-cache-control";

export const PopularPost = objectType({
  name: "PopularPost",
  definition: (t) => {
    t.nonNull.string("id");
    t.nonNull.string("title");
    t.nonNull.int("hits");
    t.nonNull.string("slug");
  },
});

export const DashboardQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.nonNull.field("totalViews", {
      type: "Int",
      resolve: async () => await getTotalViews(),
    });

    t.nonNull.field("totalReactions", {
      type: "Int",
      resolve: async () => await getTotalReactions(),
    });

    t.nonNull.field("totalDevViews", {
      type: "Int",
      resolve: async (_root, _args, _ctx, info) => {
        info.cacheControl.setCacheHint({ maxAge: 86400 });

        return await getTotalDevViews();
      },
    });

    t.nonNull.field("totalDevReactions", {
      type: "Int",
      resolve: async (_root, _args, _ctx, info) => {
        info.cacheControl.setCacheHint({ maxAge: 86400 });

        return await getTotalDevReactions();
      },
    });

    t.nonNull.list.field("mostPopularPosts", {
      type: "PopularPost",
      resolve: async () => await getMostPopularPosts(),
    });
  },
});
