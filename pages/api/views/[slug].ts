import prisma from "@/prisma";
import type { NextApiHandler } from "next";
import { getViews } from "@/lib/server/views";

const ViewsHandler: NextApiHandler = async (req, res) => {
  const slug = req.query.slug.toString();

  if (req.method === "GET") {
    return await getViews(slug);
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
