import { allPosts } from "content-collections";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => {
  const posts = allPosts.map((post) => ({
    url: `https://akhilaariyachandra.com/blog/${post._meta.path}`,
    lastModified: post.updated
      ? post.updated.split("T")[0]
      : post.posted.split("T")[0],
  }));

  const routes = ["", "/blog"].map((route) => ({
    url: `https://akhilaariyachandra.com${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...posts];
};

export default sitemap;
