import Title from "@/_components/title";
import { PRODUCTION_URL } from "@/_lib/constants";
import {
  postDateViewTransitionName,
  postTitleViewTransitionName,
} from "@/_lib/view-transition-names";
import {
  type DynamicFetchOptions,
  getDynamicFetchOptions,
  sanityFetch,
} from "@/sanity/lib/live";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "next-seo";
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
      <div className="neobrutalism-container p-3 sm:p-4">
        <Title>Blog</Title>

        {isDraftMode ? (
          <Suspense fallback={<div>Loading Posts...</div>}>
            <DynamicPostsList />
          </Suspense>
        ) : (
          <CachedPostsList perspective="published" stega={false} />
        )}

        <p className="mt-6 text-lg sm:text-xl">
          View my old blog posts{" "}
          <Link
            href="https://archive.akhilaariyachandra.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-accent hover:underline dark:text-accent-dark"
          >
            here
          </Link>
          .
        </p>
      </div>

      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: PRODUCTION_URL },
          { name: "Blog", item: `${PRODUCTION_URL}/blog` },
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
          <ViewTransition name={postTitleViewTransitionName(post.slug.current)}>
            <Link
              href={`/blog/${post.slug.current}`}
              className="block text-xl font-semibold text-balance text-accent hover:underline sm:text-2xl dark:text-accent-dark"
              prefetch
            >
              {post.title}
            </Link>
          </ViewTransition>

          <ViewTransition name={postDateViewTransitionName(post.slug.current)}>
            <div className="text-sm sm:text-base">
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
