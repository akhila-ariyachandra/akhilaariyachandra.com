import prisma from "@/prisma";
import type { NextApiHandler } from "next";

const Hits: NextApiHandler = async (req, res) => {
  const pages = await prisma.page.findMany({
    select: {
      id: true,
      hits: true,
    },
  });

  return res.status(200).json(pages);
};

export default Hits;
