import MDXComponent from "@/_components/mdx-component";
import BlogPostingStructuredData from "@/_components/structured-data/blog-posting";
import BreadcrumbStructuredData from "@/_components/structured-data/breadcrumb";
import Title from "@/_components/title";
import Views from "@/_components/views";
import { PRODUCTION_URL } from "@/_lib/constants";
import { allPosts } from "content-collections";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import Comments from "./comments";

dayjs.extend(advancedFormat);

// https://beta.nextjs.org/docs/api-reference/generate-static-params
export const generateStaticParams = () => {
  return allPosts.map((post) => ({
    slug: post._meta.path,
  }));
};

export const generateMetadata = async (
  props: PageProps<"/blog/[slug]">,
): Promise<Metadata> => {
  const params = await props.params;
  const post = allPosts.find((post) => post._meta.path === params.slug);

  if (!post) {
    notFound();
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post._meta.path}`,
      type: "article",
      publishedTime: dayjs(post.posted).toISOString(),
    },
    alternates: {
      canonical: `/blog/${post._meta.path}`,
    },
    authors: {
      name: "Akhila Ariyachandra",
      url: new URL(PRODUCTION_URL),
    },
  };
};

const BlogPostPage = async (props: PageProps<"/blog/[slug]">) => {
  const params = await props.params;
  const post = allPosts.find((post) => post._meta.path === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Title transitionName={`post-${post._meta.path}`}>{post.title}</Title>

      <ViewTransition name={`post-details-${post._meta.path}`}>
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

          <Views slug={post._meta.path} increment />
        </div>
      </ViewTransition>

      <MDXComponent mdx={post.mdx} className="mb-16" />

      <Comments />

      <BreadcrumbStructuredData
        items={[
          { name: "Home", route: "/" },
          { name: "Blog", route: "/blog" },
          { name: post.title, route: `/blog/${post._meta.path}` },
        ]}
      />
      <BlogPostingStructuredData
        title={post.title}
        content={post.content}
        posted={post.posted}
        updated={post.updated}
      />
    </>
  );
};

export default BlogPostPage;
