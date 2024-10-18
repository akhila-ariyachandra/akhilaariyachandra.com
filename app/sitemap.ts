import { allPosts } from "content-collections";
import dayjs from "dayjs";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => {
  const posts = allPosts.map((post) => ({
    url: `https://akhilaariyachandra.com/blog/${post._meta.path}`,
    lastModified: dayjs(post.updated ?? post.posted).format("YYYY-MM-DD"),
  }));

  const routes = ["", "/blog"].map((route) => ({
    url: `https://akhilaariyachandra.com${route}`,
    lastModified: dayjs().format("YYYY-MM-DD"),
  }));

  return [...routes, ...posts];
};

export default sitemap;
