import prisma from "@/prisma";
import { extendType, nonNull, idArg } from "nexus";

export const PageQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.nonNull.field("getHits", {
      type: "Int",
      args: { id: nonNull(idArg()) },
      resolve: async (_root, { id }) => {
        const { hits } = await prisma.page.findUnique({
          where: {
            id,
          },
          select: {
            hits: true,
          },
          rejectOnNotFound: true,
        });

        return hits;
      },
    });
  },
});

export const PageMutation = extendType({
  type: "Mutation",
  definition: (t) => {
    t.nonNull.field("incrementHits", {
      type: "Boolean",
      args: { id: nonNull(idArg()) },
      resolve: async (_root, { id }) => {
        try {
          await prisma.page.findUnique({
            where: {
              id,
            },
            rejectOnNotFound: true,
          });

          await prisma.page.update({
            where: { id },
            data: { hits: { increment: 1 } },
          });

          return true;
        } catch (error) {
          return false;
        }
      },
    });
  },
});
