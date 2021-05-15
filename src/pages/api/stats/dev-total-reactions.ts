import axios from "axios";
import type { NextApiHandler } from "next";
import { getTotalDevReactions } from "@/lib/stats";

const DEVTotalReactions: NextApiHandler = async (req, res) => {
  const totalReactions = await getTotalDevReactions();

  return res.status(200).send(totalReactions);
};

export default DEVTotalReactions;
