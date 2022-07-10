import type { NextApiHandler } from "next";
import prisma from "@/prisma";

const Hits: NextApiHandler = async (req, res) => {
  const id = req.query.id as string;

  if (req.method === "GET") {
    const { hits } = await prisma.page.findUniqueOrThrow({
      where: {
        id,
      },
      select: {
        hits: true,
      },
    });

    return res.status(200).send(hits ?? 0);
  } else if (req.method === "POST") {
    await prisma.page.findUniqueOrThrow({
      where: {
        id,
      },
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
