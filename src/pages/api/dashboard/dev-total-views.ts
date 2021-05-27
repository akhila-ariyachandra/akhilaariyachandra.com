import type { NextApiHandler } from "next";
import { getTotalDevViews } from "@/lib/dashboard";

const DEVTotalViews: NextApiHandler = async (req, res) => {
  const totalViews = await getTotalDevViews();

  return res.status(200).send(totalViews);
};

export default DEVTotalViews;
