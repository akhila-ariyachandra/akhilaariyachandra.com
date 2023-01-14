import dayjs from "dayjs";
import type { NextApiHandler } from "next";
import { Feed } from "feed";
import { getBlogPosts } from "@/utils/sanity";
import { urlFor } from "@/lib/sanity-client";

const RSSHandler: NextApiHandler = async (req, res) => {
  const blogPosts = await getBlogPosts();

  const feed = new Feed({
    title: "Akhila Ariyachandra's Blog RSS",
    description: "The RSS feed for my blog",
    id: "https://akhilaariyachandra.com/",
    link: "https://akhilaariyachandra.com/",
    image: "https://akhilaariyachandra.com/cover-pic.jpg",
    favicon: "https://akhilaariyachandra.com/favicon-32x32.png",
    copyright: `All rights reserved ${new Date().getFullYear()}, Akhila Ariyachandra`,
    author: {
      name: "Akhila Ariyachandra",
      link: "https://akhilaariyachandra.com/",
    },
  });

  for (const post of blogPosts) {
    feed.addItem({
      title: post.title,
      id: `https://akhilaariyachandra.com/blog/${post.slug.current}`,
      link: `https://akhilaariyachandra.com/blog/${post.slug.current}`,
      description: post.description,
      date: dayjs(post.date).toDate(),
      image: `https://akhilaariyachandra.com${urlFor(post.banner).url()}`,
    });
  }

  const content = feed.rss2();

  res.setHeader("Content-Type", "application/xml");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
  res.status(200).send(content);
};

export default RSSHandler;
