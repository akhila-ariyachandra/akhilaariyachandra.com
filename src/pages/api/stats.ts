import type { NextApiHandler } from "next";
import { getTotalViews, getTotalReactions } from "@/lib/stats";

const Stats: NextApiHandler = async (req, res) => {
  const [totalViews, totalReactions] = await Promise.all([
    getTotalViews(),
    getTotalReactions(),
  ]);

  return res.status(200).json({
    totalViews,
    totalReactions,
  });
};

export default Stats;
