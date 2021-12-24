import type { DEVArticle } from "@/lib/types";
import axios from "axios";
import prisma from "@/prisma";

export const getTotalViews = async (): Promise<number> => {
  const sum = await prisma.page.aggregate({
    _sum: {
      hits: true,
    },
  });

  return sum._sum.hits;
};

export const getTotalReactions = async (): Promise<number> => {
  const count = await prisma.reaction.aggregate({ _sum: { count: true } });

  return count?._sum?.count ?? 0;
};

export const getMostPopularPosts = async () => {
  const posts = await prisma.page.findMany({
    orderBy: {
      hits: "desc",
    },
    select: {
      id: true,
      title: true,
      hits: true,
      slug: true,
    },
    take: 3,
  });

  return posts;
};

export const getTotalDevViews = async (): Promise<number> => {
  const { data } = await axios.request<DEVArticle[]>({
    url: "https://dev.to/api/articles/me/published",
    headers: {
      "api-key": process.env.DEV_API_KEY,
    },
  });

  const totalViews = data.reduce(
    (accumulator, currentValue) => accumulator + currentValue.page_views_count,
    0
  );

  return totalViews;
};

export const getTotalDevReactions = async (): Promise<number> => {
  const { data } = await axios.request<DEVArticle[]>({
    url: "https://dev.to/api/articles/me/published",
    headers: {
      "api-key": process.env.DEV_API_KEY,
    },
  });

  const totalReactions = data.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.public_reactions_count,
    0
  );

  return totalReactions;
};
