import type { NextApiHandler } from "next";
import { getTotalDevViews } from "@/lib/dashboard";

const TotalDevViews: NextApiHandler = async (req, res) => {
  const totalDevViews = await getTotalDevViews();

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=43200"
  );

  return res.status(200).send(totalDevViews);
};

export default TotalDevViews;
