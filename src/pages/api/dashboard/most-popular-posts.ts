import type { NextApiHandler } from "next";
import { getMostPopularPosts } from "@/lib/dashboard";

const MostPopularPosts: NextApiHandler = async (req, res) => {
  const mostPopularPosts = await getMostPopularPosts();

  res.setHeader("Cache-Control", "public, s-maxage=1, stale-while-revalidate");

  return res.status(200).send(mostPopularPosts);
};

export default MostPopularPosts;
