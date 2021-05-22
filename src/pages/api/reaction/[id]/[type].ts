import prisma from "@/prisma";
import { NextApiHandler } from "next";

const Reaction: NextApiHandler = async (req, res) => {
  const id = req.query.id as string;
  const type = req.query.type as string;
  const uid = req.headers.uid as string;

  if (req.method === "POST") {
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

      return res.status(200).send("Reacted");
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

      return res.status(200).send("Removed Reaction");
    }
  } else if (req.method === "GET") {
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

    return res.status(200).json({
      count,
      reacted: reaction ? true : false,
    });
  }
};

export default Reaction;
