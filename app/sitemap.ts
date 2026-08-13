import { PRODUCTION_URL } from "@/_lib/constants";
import { sanityFetchStaticParams } from "@/sanity/lib/live";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import dayjs from "dayjs";
import type { MetadataRoute } from "next";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const { data } = await sanityFetchStaticParams({
    query: POSTS_QUERY,
  });

  const posts = data.map((post) => ({
    url: `${PRODUCTION_URL}/blog/${post.slug.current}`,
    lastModified: dayjs(post._updatedAt).format("YYYY-MM-DD"),
  }));

  const routes = ["", "/blog"].map((route) => ({
    url: `${PRODUCTION_URL}${route}`,
    lastModified: dayjs().format("YYYY-MM-DD"),
  }));

  return [...routes, ...posts];
};

export default sitemap;
