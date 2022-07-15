import { getMostPopularPosts } from "@/lib/dashboard";
import type { NextApiHandler } from "next";

const MostPopularPosts: NextApiHandler = async (req, res) => {
  const mostPopularPosts = await getMostPopularPosts();

  return res.status(200).send(mostPopularPosts);
};

export default MostPopularPosts;
