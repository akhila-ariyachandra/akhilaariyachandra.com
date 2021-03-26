import type { NextApiHandler } from "next";
import { getTotalReactions } from "@/lib/stats";

const TotalReactions: NextApiHandler = async (req, res) => {
  const totalReactions = await getTotalReactions();

  // Cache the response
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=3600"
  );

  return res.status(200).send(totalReactions);
};

export default TotalReactions;
