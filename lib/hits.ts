import { PrismaClient } from "@prisma/client";

export const getPageHits = async (id: string): Promise<number> => {
  const prisma = new PrismaClient();
  const { hits } = await prisma.page.findUnique({
    where: { id },
    select: {
      hits: true,
    },
  });

  return hits;
};
