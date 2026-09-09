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
import { Suspense } from "react";

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
            className="text-accent dark:text-accent-dark font-semibold hover:underline"
          >
            here
          </Link>
          .
        </p>
      </div>

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
          <Link
            href={`/blog/${post.slug.current}`}
            className="text-accent dark:text-accent-dark block text-xl font-semibold text-balance hover:underline sm:text-2xl"
            prefetch
          >
            {post.title}
          </Link>

          <div className="text-sm sm:text-base">
            <time dateTime={dayjs(post.posted).toISOString()}>
              {dayjs(post.posted).format("Do MMMM YYYY")}
            </time>
          </div>
        </li>
      ))}
    </ul>
  );
};
