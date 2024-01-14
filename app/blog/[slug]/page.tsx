import { allPosts } from ".contentlayer/generated";
import MDXComponent from "@/_components/mdx-component";
import Title from "@/_components/title";
import Views from "@/_components/views";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostPageProps } from "./types";

dayjs.extend(advancedFormat);

// https://beta.nextjs.org/docs/api-reference/generate-static-params
export const generateStaticParams = () => {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
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

      <div className="mb-4 text-sm text-zinc-600 sm:mb-5 sm:text-base dark:text-zinc-400">
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
