import type { DEVArticle } from "@/lib/types";

export const getDevTotalViews = async () => {
  const response = await fetch("https://dev.to/api/articles/me/published", {
    headers: {
      "api-key": process.env.DEV_API_KEY as string,
    },
    next: {
      revalidate: 86400,
    },
  });
  const data = (await response.json()) as DEVArticle[];

  const totalViews = data.reduce(
    (accumulator, currentValue) => accumulator + currentValue.page_views_count,
    0
  );

  return totalViews;
};

export const getDevTotalReactions = async () => {
  const response = await fetch("https://dev.to/api/articles/me/published", {
    headers: {
      "api-key": process.env.DEV_API_KEY as string,
    },
    next: {
      revalidate: 86400,
    },
  });
  const data = (await response.json()) as DEVArticle[];

  const totalReactions = data.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.public_reactions_count,
    0
  );

  return totalReactions;
};
