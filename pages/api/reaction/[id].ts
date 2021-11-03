import prisma, { Reaction } from "@/prisma";
import type { NextApiHandler } from "next";
import { REACTION_LIMIT } from "@/lib/constants";

const ReactionHandler: NextApiHandler = async (req, res) => {
  const uid = req.headers.uid as string;
  const pageId = req.query.id as string;
  let reaction: Reaction;

  if (req.method === "POST") {
    const increment = parseInt(req.body.increment as string);

    if (increment <= 0) {
      return res.status(422).json({
        message: "Invalid value",
      });
    }

    // Check if reaction exists
    reaction = await prisma.reaction.findUnique({
      where: {
        id_pageId: {
          id: uid,
          pageId,
        },
      },
    });

    // If reaction exists and it' less than the limit, increment it
    if (reaction && reaction.count < REACTION_LIMIT) {
      const availableReactions = REACTION_LIMIT - reaction.count;

      reaction = await prisma.reaction.update({
        where: {
          id_pageId: {
            id: uid,
            pageId,
          },
        },
        data: {
          count: {
            increment:
              increment > availableReactions ? availableReactions : increment,
          },
        },
      });
    } else if (!reaction) {
      const trueCount = increment > REACTION_LIMIT ? REACTION_LIMIT : increment;

      // If reaction doesn't exist, create it
      reaction = await prisma.reaction.create({
        data: {
          id: uid,
          pageId,
          count: trueCount,
        },
      });
    }
  } else if (req.method === "GET") {
    reaction = await prisma.reaction.findUnique({
      where: {
        id_pageId: {
          id: uid,
          pageId,
        },
      },
    });
  }

  const total = await prisma.reaction.aggregate({
    where: {
      pageId,
    },
    _sum: {
      count: true,
    },
  });

  return res
    .status(200)
    .json({ count: reaction?.count ?? 0, total: total?._sum?.count ?? 0 });
};

export default ReactionHandler;
