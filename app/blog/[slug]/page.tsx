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
import Comments from "./comments";

dayjs.extend(advancedFormat);

const slugsToIgnoreContent = [
  "client-side-rendering-vs-server-side-rendering",
] as const;

// https://beta.nextjs.org/docs/api-reference/generate-static-params
export const generateStaticParams = () => {
  return allPosts
    .filter((post) => !post.archived)
    .map((post) => ({
      slug: post._meta.path,
    }));
};

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const generateMetadata = async (
  props: BlogPostPageProps,
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
    robots: {
      index: !post.archived,
      follow: !post.archived,
    },
  };
};

const BlogPostPage = async (props: BlogPostPageProps) => {
  const params = await props.params;
  const post = allPosts.find((post) => post._meta.path === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Title
        style={{
          viewTransitionName: `title-${post._meta.path}`,
        }}
      >
        {post.title}
      </Title>

      <div className="mb-4 text-sm text-zinc-600 sm:mb-5 sm:text-base dark:text-zinc-400">
        <time
          dateTime={dayjs(post.posted).toISOString()}
          style={{
            viewTransitionName: `date-${post._meta.path}`,
          }}
        >
          {`${dayjs(post.posted).format("Do MMMM YYYY")}${
            post.updated
              ? ` (Updated on ${dayjs(post.updated).format("Do MMMM YYYY")})`
              : ""
          }`}
        </time>

        <span
          className="font-light text-zinc-500 dark:text-zinc-400"
          style={{
            viewTransitionName: `separator-${post._meta.path}`,
          }}
        >
          {" - "}
        </span>

        <Views slug={post._meta.path} increment />
      </div>

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
        content={
          slugsToIgnoreContent.includes(post._meta.path)
            ? undefined
            : post.content
        }
        posted={post.posted}
        updated={post.updated}
      />
    </>
  );
};

export default BlogPostPage;
