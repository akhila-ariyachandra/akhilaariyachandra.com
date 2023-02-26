import dayjs from "dayjs";
import { NextResponse } from "next/server";
import { Feed } from "feed";
import { allPosts } from "contentlayer/generated";

export const GET = async () => {
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

  for (const post of allPosts) {
    feed.addItem({
      title: post.title,
      id: `https://akhilaariyachandra.com/blog/${post.slug}`,
      link: `https://akhilaariyachandra.com/blog/${post.slug}`,
      description: post.description,
      date: dayjs(post.posted).toDate(),
      image: `https://akhilaariyachandra.com${post.banner}`,
    });
  }

  const content = feed.rss2();

  return new NextResponse(content, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
};
