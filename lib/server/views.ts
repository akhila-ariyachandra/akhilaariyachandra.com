import prisma from "@/prisma";

export const getViews = async (slug: string) => {
  try {
    const views = await prisma.views.findUniqueOrThrow({
      where: {
        slug,
      },
    });

    return views;
  } catch {
    return {
      slug,
      count: 0,
    };
  }
};
