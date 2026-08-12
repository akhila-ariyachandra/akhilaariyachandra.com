import BreadcrumbStructuredData from "@/_components/structured-data/breadcrumb";
import Title from "@/_components/title";
import {
  type DynamicFetchOptions,
  getDynamicFetchOptions,
  sanityFetch,
} from "@/sanity/lib/live";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import type { Metadata } from "next";
import { draftMode } from "next/headers";
import Link from "next/link";
import { Suspense, ViewTransition } from "react";

dayjs.extend(advancedFormat);

export const metadata: Metadata = {
  title: "Blog",
  description: "My personal blog",
  openGraph: {
    title: "Blog",
    description: "My personal blog",
    url: "/blog",
    type: "website",
  },
  alternates: {
    canonical: "/blog",
  },
};

const BlogPage = async () => {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <>
      <Title>Blog</Title>

      {isDraftMode ? (
        <Suspense
          fallback={
            <section className="text-zinc-600 dark:text-zinc-300">
              Loading Posts...
            </section>
          }
        >
          <DynamicPostsList />
        </Suspense>
      ) : (
        <CachedPostsList perspective="published" stega={false} />
      )}

      <p className="mt-6 text-lg text-zinc-600 sm:text-xl dark:text-zinc-400">
        View my old blog posts{" "}
        <Link
          href="https://archive.akhilaariyachandra.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent dark:text-accent-dark hover:underline"
        >
          here
        </Link>
        .
      </p>

      <BreadcrumbStructuredData
        items={[
          { name: "Home", route: "/" },
          { name: "Blog", route: "/blog" },
        ]}
      />
    </>
  );
};

export default BlogPage;

const DynamicPostsList = async () => {
  const { perspective, stega } = await getDynamicFetchOptions();

  return <CachedPostsList perspective={perspective} stega={stega} />;
};

const CachedPostsList = async ({ perspective, stega }: DynamicFetchOptions) => {
  "use cache";

  const { data: posts } = await sanityFetch({
    query: POSTS_QUERY,
    perspective,
    stega,
  });

  return (
    <ul className="space-y-2 sm:space-y-3">
      {posts.map((post) => (
        <li key={post._id}>
          <ViewTransition name={`post-${post._id}`}>
            <Link
              href={`/blog/${post.slug.current}`}
              className="font-display text-accent dark:text-accent-dark text-xl font-medium tracking-tighter text-balance hover:underline sm:text-2xl"
            >
              {post.title}
            </Link>
          </ViewTransition>

          <ViewTransition name={`post-details-${post._id}`}>
            <div className="text-sm text-zinc-600 sm:text-base dark:text-zinc-400">
              <time dateTime={dayjs(post.posted).toISOString()}>
                {dayjs(post.posted).format("Do MMMM YYYY")}
              </time>
            </div>
          </ViewTransition>
        </li>
      ))}
    </ul>
  );
};
