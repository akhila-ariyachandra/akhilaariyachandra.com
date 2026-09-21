import BlogPost from "@/_components/blog/blog-post";
import { PRODUCTION_URL } from "@/_lib/constants";
import {
  getDynamicFetchOptions,
  sanityFetchMetadata,
  sanityFetchStaticParams,
} from "@/sanity/lib/live";
import { POST_BY_SLUG_QUERY, POSTS_QUERY } from "@/sanity/lib/queries";
import dayjs from "dayjs";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const generateStaticParams = async () => {
  const { data } = await sanityFetchStaticParams({
    query: POSTS_QUERY,
    params: {
      archived: true,
    },
  });

  return data.map((post) => ({
    slug: post.slug.current,
  }));
};

export const generateMetadata = async ({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> => {
  const [{ slug }, { perspective }] = await Promise.all([
    params,
    getDynamicFetchOptions(),
  ]);

  const { data: post } = await sanityFetchMetadata({
    query: POST_BY_SLUG_QUERY,
    params: { slug, archived: true },
    perspective,
  });

  if (!post) {
    notFound();
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/archive/${slug}`,
      type: "article",
      publishedTime: dayjs(post.posted).toISOString(),
    },
    alternates: {
      canonical: `/blog/archive/${slug}`,
    },
    authors: {
      name: "Akhila Ariyachandra",
      url: new URL(PRODUCTION_URL),
    },
    robots: {
      index: false,
      follow: false,
    },
  };
};

const BlogPostPage = async (props: PageProps<"/blog/archive/[slug]">) => {
  return <BlogPost {...props} archived />;
};

export default BlogPostPage;
