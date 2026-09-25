import { PRODUCTION_URL } from "@/_lib/constants";
import { sanityFetchStaticParams } from "@/sanity/lib/live";
import { HOME_PAGE_UPDATED_AT_QUERY, POSTS_QUERY } from "@/sanity/lib/queries";
import dayjs from "dayjs";
import type { MetadataRoute } from "next";

const getLatestDate = (dates: string[]) =>
  dates.reduce<string | undefined>(
    (latest, date) => (!latest || dayjs(date).isAfter(latest) ? date : latest),
    undefined,
  );

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const [{ data: postsData }, { data: homePageUpdatedAt }] = await Promise.all([
    sanityFetchStaticParams({
      query: POSTS_QUERY,
      params: {
        archived: false,
      },
    }),
    sanityFetchStaticParams({
      query: HOME_PAGE_UPDATED_AT_QUERY,
    }),
  ]);

  const posts = postsData.map((post) => ({
    url: `${PRODUCTION_URL}/blog/${post.slug.current}`,
    lastModified: post._updatedAt,
  }));

  return [
    {
      url: PRODUCTION_URL,
      lastModified: getLatestDate(homePageUpdatedAt),
    },
    {
      url: `${PRODUCTION_URL}/blog`,
      lastModified: getLatestDate(postsData.map((post) => post._updatedAt)),
    },
    ...posts,
  ];
};

export default sitemap;
