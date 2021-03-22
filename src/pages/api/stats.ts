import type { NextApiHandler } from "next";
import { getTotalViews, getTotalReactions } from "@/lib/stats";

const Stats: NextApiHandler = async (req, res) => {
  const [totalViews, totalReactions] = await Promise.all([
    getTotalViews(),
    getTotalReactions(),
  ]);

  // Cache the response
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=600, stale-while-revalidate=3600"
  );

  return res.status(200).json({
    totalViews,
    totalReactions,
  });
};

export default Stats;
