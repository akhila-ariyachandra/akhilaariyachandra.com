import type { NextApiHandler } from "next";
import { getMostPopularPosts } from "@/lib/dashboard";

const MostPopularPosts: NextApiHandler = async (req, res) => {
  const mostPopularPosts = await getMostPopularPosts();

  return res.status(200).send(mostPopularPosts);
};

export default MostPopularPosts;
