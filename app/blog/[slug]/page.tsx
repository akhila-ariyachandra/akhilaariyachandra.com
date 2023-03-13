import dayjs from "dayjs";
import getQueryClient from "@/lib/getQueryClient";
import Image from "next/image";
import config from "@/lib/config";
import Balancer from "react-wrap-balancer";
import BlogPostViews from "./views";
import MDXComponent from "@/components/MDXComponent";
import HydrateWrapper from "@/components/HydrateWrapper";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dehydrate } from "@tanstack/react-query";
import { eq } from "drizzle-orm/expressions";
import { formatDate } from "@/lib/helpers";
import { allPosts } from "contentlayer/generated";
import { db, views } from "@/db/schema";

export const revalidate = 3600; // 1 hour

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
      title: post.title,
      description: post.description,
      url: `${config.siteUrl}/blog/${post.slug}`,
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

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const slug = params?.slug.toString();

  const post = allPosts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  const queryClient = getQueryClient();

  const result = await db.select().from(views).where(eq(views.slug, slug));
  if (result?.length > 0) {
    await queryClient.prefetchQuery({
      // eslint-disable-next-line @tanstack/query/exhaustive-deps
      queryKey: ["views", result[0].slug],
      queryFn: () => result[0],
    });
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrateWrapper state={dehydratedState}>
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
    </HydrateWrapper>
  );
};

export default BlogPostPage;
