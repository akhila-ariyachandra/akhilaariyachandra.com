import type { NextApiHandler } from "next";
import { getTotalReactions } from "@/lib/dashboard";

const TotalReactions: NextApiHandler = async (req, res) => {
  const totalReactions = await getTotalReactions();

  return res.status(200).send(totalReactions);
};

export default TotalReactions;
