import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import MDXComponent from "@/components/MDXComponent";
import Title from "@/components/Title";
import Views from "@/components/Views";
import { getOgImage } from "@/lib/helpers";

import { allPosts } from ".contentlayer/generated";

dayjs.extend(advancedFormat);

// https://beta.nextjs.org/docs/api-reference/generate-static-params
export const generateStaticParams = () => {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
};

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

export const generateMetadata = async ({
  params,
}: BlogPostPageProps): Promise<Metadata> => {
  const post = allPosts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return {
    title: post.title,
    description: "A post on my blog",
    openGraph: {
      title: post.title,
      description: "A post on my blog",
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: dayjs(post.posted).toISOString(),
      images: getOgImage(
        post.title,
        "Akhila Ariyachandra",
        dayjs(post.posted).format("Do MMMM YYYY"),
      ),
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    authors: {
      name: "Akhila Ariyachandra",
      url: new URL("https://akhilaariyachandra.com"),
    },
  };
};

const BlogPostPage = ({ params }: BlogPostPageProps) => {
  const post = allPosts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Title>{post.title}</Title>

      <div className="mb-4 text-sm text-zinc-600 dark:text-zinc-400 sm:mb-5 sm:text-base">
        <time dateTime={dayjs(post.posted).toISOString()}>
          {`${dayjs(post.posted).format("Do MMMM YYYY")}${
            post.updated
              ? ` (Updated on ${dayjs(post.updated).format("Do MMMM YYYY")})`
              : ""
          }`}
        </time>

        <span className="font-light text-zinc-500 dark:text-zinc-400">
          {" - "}
        </span>

        <Views slug={post.slug} incrementOnMount />
      </div>

      <MDXComponent code={post.body.code} />
    </>
  );
};

export default BlogPostPage;
