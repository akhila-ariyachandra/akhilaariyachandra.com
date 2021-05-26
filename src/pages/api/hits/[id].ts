import prisma from "@/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

const RegisterHit = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id as string;

  let page = await prisma.page.findUnique({
    where: {
      id,
    },
  });

  // Increment hits for POST requests
  if (req.method === "POST") {
    page = await prisma.page.update({
      where: { id },
      data: { hits: { increment: 1 } },
    });
  }

  return res.status(200).send(page.hits ?? 0);
};

export default RegisterHit;
