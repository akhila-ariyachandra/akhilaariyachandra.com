import type { NextApiHandler } from "next";
import { getTotalReactions } from "@/lib/stats";

const TotalReactions: NextApiHandler = async (req, res) => {
  const totalReactions = await getTotalReactions();

  return res.status(200).send(totalReactions);
};

export default TotalReactions;
