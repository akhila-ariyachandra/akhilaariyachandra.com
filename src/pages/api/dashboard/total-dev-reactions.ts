import type { NextApiHandler } from "next";
import { getTotalDevReactions } from "@/lib/dashboard";

const TotalDevReactions: NextApiHandler = async (req, res) => {
  const totalDevReactions = await getTotalDevReactions();

  return res.status(200).send(totalDevReactions);
};

export default TotalDevReactions;
