import NextCors from "nextjs-cors";
import prisma from "@/prisma";
import type { NextApiHandler } from "next";

const ViewsHandler: NextApiHandler = async (req, res) => {
  try {
    const slug = req.query.slug.toString();

    await NextCors(req, res, {
      methods: ["GET", "POST"],
      origin: true,
    });

    if (req.method === "POST") {
      // Uncomment after migrating all data to new schema
      /* const views = await prisma.views.upsert({
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
      }); */

      // Get current views
      const page = await prisma.page.findUnique({
        where: {
          id: slug,
        },
      });

      const views = await prisma.views.upsert({
        create: {
          slug,
          count: page?.hits ? page.hits + 1 : 1,
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

      return res.status(200).json({ views: views.count });
    } else if (req.method === "GET") {
      const views = await prisma.views.findUnique({
        where: {
          slug,
        },
      });

      return res.status(200).json({ views: views?.count ?? 0 });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default ViewsHandler;
