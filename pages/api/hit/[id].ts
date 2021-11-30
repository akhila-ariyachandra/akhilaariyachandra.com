import type { NextApiHandler } from "next";
import { PrismaClient } from "@prisma/client";

const Hits: NextApiHandler = async (req, res) => {
  const id = req.query.id as string;

  const prisma = new PrismaClient();

  if (req.method === "GET") {
    const { hits } = await prisma.page.findUnique({
      where: {
        id,
      },
      select: {
        hits: true,
      },
      rejectOnNotFound: true,
    });

    return res.status(200).send(hits ?? 0);
  } else if (req.method === "POST") {
    await prisma.page.findUnique({
      where: {
        id,
      },
      rejectOnNotFound: true,
    });

    await prisma.page.update({
      where: { id },
      data: { hits: { increment: 1 } },
    });

    return res.status(200).send({ message: "Incremented" });
  }

  return;
};

export default Hits;
