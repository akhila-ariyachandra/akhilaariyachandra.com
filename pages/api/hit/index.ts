import type { NextApiHandler } from "next";
import { PrismaClient } from "@prisma/client";

const Hits: NextApiHandler = async (req, res) => {
  const prisma = new PrismaClient();
  const pages = await prisma.page.findMany({
    select: {
      id: true,
      hits: true,
    },
  });

  return res.status(200).json(pages);
};

export default Hits;
