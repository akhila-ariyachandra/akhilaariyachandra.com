import prisma from "@/prisma";
import type { NextApiHandler } from "next";

const ViewsHandler: NextApiHandler = async (req, res) => {
  try {
    const slug = req.query.slug.toString();

    if (req.method === "POST") {
      const view = await prisma.views.upsert({
        create: {
          slug,
        },
        where: {
          slug,
        },
        update: {
          count: {
            increment: 1,
          },
        },
      });

      return res.status(200).json(view);
    } else if (req.method === "GET") {
      const view = await prisma.views.findUnique({
        where: {
          slug,
        },
      });

      return res.status(200).json(view);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default ViewsHandler;
