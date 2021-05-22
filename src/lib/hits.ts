import prisma from "@/prisma";

export const getPageHits = async (id: string): Promise<number> => {
  const { hits } = await prisma.page.findUnique({
    where: { id },
    select: {
      hits: true,
    },
  });

  return hits;
};
