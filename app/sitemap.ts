import { PRODUCTION_URL } from "@/_lib/constants";
import { allPosts } from "content-collections";
import dayjs from "dayjs";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => {
  const posts = allPosts
    .filter((post) => !post.archived)
    .map((post) => ({
      url: `${PRODUCTION_URL}/blog/${post._meta.path}`,
      lastModified: dayjs(post.updated ?? post.posted).format("YYYY-MM-DD"),
    }));

  const routes = ["", "/blog"].map((route) => ({
    url: `${PRODUCTION_URL}${route}`,
    lastModified: dayjs().format("YYYY-MM-DD"),
  }));

  return [...routes, ...posts];
};

export default sitemap;
