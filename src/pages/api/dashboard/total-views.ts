import type { NextApiHandler } from "next";
import { getTotalViews } from "@/lib/dashboard";

const TotalViews: NextApiHandler = async (req, res) => {
  const totalViews = await getTotalViews();

  return res.status(200).send(totalViews);
};

export default TotalViews;
