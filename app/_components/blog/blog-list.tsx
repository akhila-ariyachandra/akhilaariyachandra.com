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
import { type Route } from "next";
import { stegaClean } from "next-sanity";
import { draftMode } from "next/headers";
import Link from "next/link";
import { Suspense, ViewTransition } from "react";

dayjs.extend(advancedFormat);

type BlogListProps = {
  archived?: boolean;
};

const BlogList = async ({ archived = false }: BlogListProps) => {
  const { isEnabled: isDraftMode } = await draftMode();

  if (isDraftMode) {
    return (
      <Suspense fallback={<div>Loading Posts...</div>}>
        <DynamicPostsList archived={archived} />
      </Suspense>
    );
  }

  return (
    <CachedPostsList
      perspective="published"
      stega={false}
      archived={archived}
    />
  );
};

export default BlogList;

const DynamicPostsList = async (props: BlogListProps) => {
  const { perspective, stega } = await getDynamicFetchOptions();

  return <CachedPostsList perspective={perspective} stega={stega} {...props} />;
};

const CachedPostsList = async ({
  perspective,
  stega,
  archived,
}: DynamicFetchOptions & BlogListProps) => {
  "use cache";

  const { data: posts } = await sanityFetch({
    query: POSTS_QUERY,
    params: {
      archived,
    },
    perspective,
    stega,
  });

  return (
    <ul className="space-y-2 sm:space-y-3">
      {posts.map((post) => (
        <li key={post._id}>
          <ViewTransition name={postTitleViewTransitionName(post.slug.current)}>
            <Link
              href={stegaClean(
                `/blog/${archived ? "archive/" : ""}${post.slug.current}` as Route,
              )}
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
