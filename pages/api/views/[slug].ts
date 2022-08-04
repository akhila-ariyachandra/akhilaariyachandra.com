import prisma from "@/prisma";
import type { NextApiHandler } from "next";

const ViewsHandler: NextApiHandler = async (req, res) => {
  const slug = req.query.slug.toString();

  if (req.method === "GET") {
    try {
      const views = await prisma.views.findUniqueOrThrow({
        where: {
          slug,
        },
      });

      return res.status(200).json(views);
    } catch {
      return res.status(200).json({
        slug,
        count: 0,
      });
    }
  } else if (req.method === "POST") {
    const views = await prisma.views.upsert({
      create: {
        slug,
      },
      update: {
        count: {
          increment: 1,
        },
      },
      where: {
        slug,
      },
    });

    return res.status(200).json(views);
  }
};

export default ViewsHandler;
