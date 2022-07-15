import { getTotalDevViews } from "@/lib/dashboard";
import type { NextApiHandler } from "next";

const TotalDevViews: NextApiHandler = async (req, res) => {
  const totalDevViews = await getTotalDevViews();

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=43200"
  );

  return res.status(200).send(totalDevViews);
};

export default TotalDevViews;
