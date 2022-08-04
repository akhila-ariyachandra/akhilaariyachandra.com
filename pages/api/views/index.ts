import prisma from "@/prisma";
import type { NextApiHandler } from "next";

const ViewsHandler: NextApiHandler = async (req, res) => {
  const views = await prisma.views.aggregate({
    _sum: {
      count: true,
    },
  });

  return res.status(200).json({ count: views?._sum?.count ?? 0 });
};

export default ViewsHandler;
