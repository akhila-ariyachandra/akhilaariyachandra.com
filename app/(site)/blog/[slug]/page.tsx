import BlogPost from "@/_components/blog/blog-post";
import { PRODUCTION_URL } from "@/_lib/constants";
import {
  getDynamicFetchOptions,
  sanityFetchMetadata,
  sanityFetchStaticParams,
} from "@/sanity/lib/live";
import { POST_BY_SLUG_QUERY, POSTS_QUERY } from "@/sanity/lib/queries";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const generateStaticParams = async () => {
  const { data } = await sanityFetchStaticParams({
    query: POSTS_QUERY,
    params: {
      archived: false,
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
    params: { slug, archived: false },
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
      url: `/blog/${slug}`,
      type: "article",
      publishedTime: post.posted,
      modifiedTime: post._updatedAt,
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
    authors: {
      name: "Akhila Ariyachandra",
      url: new URL(PRODUCTION_URL),
    },
  };
};

const BlogPostPage = async (props: PageProps<"/blog/[slug]">) => {
  return <BlogPost {...props} />;
};

export default BlogPostPage;
