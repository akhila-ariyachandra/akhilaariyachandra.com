import type { NextApiHandler } from "next";
import { getTotalDevViews } from "@/lib/dashboard";

const TotalDevViews: NextApiHandler = async (req, res) => {
  const totalDevViews = await getTotalDevViews();

  return res.status(200).send(totalDevViews);
};

export default TotalDevViews;
