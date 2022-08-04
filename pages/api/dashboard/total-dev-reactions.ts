import { getTotalDevReactions } from "@/lib/dashboard";
import type { NextApiHandler } from "next";

const TotalDevReactions: NextApiHandler = async (req, res) => {
  const totalDevReactions = await getTotalDevReactions();

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=43200"
  );

  return res.status(200).json({ count: totalDevReactions });
};

export default TotalDevReactions;
