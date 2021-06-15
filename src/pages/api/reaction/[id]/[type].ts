import prisma, { ReactionType } from "@/prisma";
import type { NextApiHandler } from "next";

const Reaction: NextApiHandler = async (req, res) => {
  const uid = req.headers.uid as string;
  const pageId = req.query.id as string;
  const type = req.query.type as ReactionType;

  if (req.method === "GET") {
    const count = await prisma.reaction.count({
      where: {
        pageId,
        type,
      },
    });

    const reaction = await prisma.reaction.findUnique({
      where: {
        id_pageId_type: {
          id: uid,
          type,
          pageId,
        },
      },
    });

    return res.status(200).send({ count, reacted: reaction ? true : false });
  } else if (req.method === "POST") {
    const reaction = await prisma.reaction.findUnique({
      where: {
        id_pageId_type: {
          id: uid,
          type,
          pageId,
        },
      },
    });

    if (!reaction) {
      await prisma.reaction.create({
        data: {
          id: uid,
          type,
          pageId,
        },
      });

      return res.status(200).send({
        message: "React",
      });
    } else {
      await prisma.reaction.delete({
        where: {
          id_pageId_type: {
            id: uid,
            type,
            pageId,
          },
        },
      });

      return res.status(200).send({ message: "Remove Reaction" });
    }
  }

  return;
};

export default Reaction;
