import prisma from "@/prisma";
import { objectType, extendType, nonNull, idArg, stringArg } from "nexus";

export const Reaction = objectType({
  name: "Reaction",
  definition: (t) => {
    t.nonNull.int("count");
    t.nonNull.boolean("reacted");
  },
});

export const ReactionQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.nonNull.field("getReaction", {
      type: "Reaction",
      args: {
        id: nonNull(idArg()),
        type: nonNull(stringArg()),
      },
      resolve: async (_root, { id, type }, { req }) => {
        const uid = req.headers.uid as string;

        const count = await prisma.reaction.count({
          where: {
            pageId: id,
            type,
          },
        });

        const reaction = await prisma.reaction.findUnique({
          where: {
            id_pageId_type: {
              id: uid,
              type,
              pageId: id,
            },
          },
        });

        return {
          count,
          reacted: reaction ? true : false,
        };
      },
    });
  },
});

export const ReactionMutation = extendType({
  type: "Mutation",
  definition: (t) => {
    t.nonNull.field("react", {
      type: "Boolean",
      args: {
        id: nonNull(idArg()),
        type: nonNull(stringArg()),
      },
      resolve: async (_root, { id, type }, { req }) => {
        const uid = req.headers.uid as string;

        const reaction = await prisma.reaction.findUnique({
          where: {
            id_pageId_type: {
              id: uid,
              type,
              pageId: id,
            },
          },
        });

        if (!reaction) {
          await prisma.reaction.create({
            data: {
              id: uid,
              type,
              pageId: id,
            },
          });

          return true;
        } else {
          await prisma.reaction.delete({
            where: {
              id_pageId_type: {
                id: uid,
                type,
                pageId: id,
              },
            },
          });

          return false;
        }
      },
    });
  },
});
