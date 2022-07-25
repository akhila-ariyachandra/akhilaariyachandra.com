import type { DEVArticle } from "@/lib/types";
import axios from "axios";

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
