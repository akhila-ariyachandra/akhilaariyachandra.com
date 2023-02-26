import dayjs from "dayjs";
import Image from "next/image";
import config from "@/lib/config";
import Balancer from "react-wrap-balancer";
import BlogPostViews from "./views";
import MDXComponent from "@/components/MDXComponent";
import type { FC } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/helpers";
import { allPosts } from "contentlayer/generated";

// https://beta.nextjs.org/docs/api-reference/generate-static-params
export const generateStaticParams = () => {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
};

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export const generateMetadata = ({ params }: BlogPostPageProps) => {
  const slug = params?.slug.toString();

  const post = allPosts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      url: config.siteUrl,
      type: "article",
      images: [
        {
          url: `${config.siteUrl}${post.banner}`,
          width: 1200,
          height: 630,
        },
      ],
      authors: [config.author.name],
      publishedTime: post.posted,
      modifiedTime: post.updated ? post.updated : undefined,
    },
  } satisfies Metadata;
};

const BlogPostPage: FC<BlogPostPageProps> = ({ params }) => {
  const slug = params?.slug.toString();

  const post = allPosts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Image
        src={post.banner}
        alt={post.title}
        title={post.title}
        width={1200}
        height={630}
        className="rounded-lg"
        priority
      />

      {post.unsplash?.photographer && post.unsplash?.link ? (
        <p className="my-2 px-4 text-center font-roboto-slab text-sm font-medium text-zinc-800 dark:text-zinc-200 sm:text-base">
          {"Photo by "}
          <a
            href={post.unsplash.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-700 dark:text-emerald-600"
          >
            {post.unsplash.photographer}
          </a>
        </p>
      ) : null}

      <h1 className="my-4 px-4 text-center font-sora text-3xl font-black text-zinc-800 dark:text-zinc-200 sm:text-4xl">
        <Balancer>{post.title}</Balancer>
      </h1>

      <div className="my-2 flex flex-col items-center px-4 font-roboto-slab text-base font-medium text-zinc-800 dark:text-zinc-200 sm:flex-row sm:justify-center sm:text-lg">
        <p>
          Posted on{" "}
          <time dateTime={dayjs(post.posted).toISOString()}>
            {formatDate(post.posted)}
          </time>
        </p>

        {post.updated && (
          <>
            <span className="hidden sm:mx-2 sm:block">&bull;</span>
            <p>
              Last updated on{" "}
              <time dateTime={dayjs(post.updated).toISOString()}>
                {formatDate(post.updated)}
              </time>
            </p>
          </>
        )}
      </div>

      <div className="my-2 flex flex-col items-center px-4 font-roboto-slab text-base font-medium text-zinc-800 dark:text-zinc-200 sm:flex-row sm:justify-center sm:text-lg">
        <p>{post.readingTime}</p>

        <span className="hidden sm:mx-2 sm:block">&bull;</span>

        <BlogPostViews slug={post.slug} />
      </div>

      <MDXComponent code={post.body.code} />
    </>
  );
};

export default BlogPostPage;
