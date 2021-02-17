import type { NextApiHandler } from "next";
import {
  getTotalViews,
  getTotalReactions,
  getMostPopularPosts,
} from "@/lib/stats";

const Stats: NextApiHandler = async (req, res) => {
  const [totalViews, totalReactions, mostPopularPosts] = await Promise.all([
    getTotalViews(),
    getTotalReactions(),
    getMostPopularPosts(),
  ]);

  return res.status(200).json({
    totalViews,
    totalReactions,
    mostPopularPosts,
  });
};

export default Stats;
