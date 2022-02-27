import React from "react";
import useHits from "@/hooks/use-hits";
import prisma from "@/prisma";
import SEO from "@/components/SEO";
import Image from "next/image";
import HitCounter from "@/components/post/HitCounter";
import Reactions from "@/components/post/Reactions";
import MDXComponent from "@/components/post/MDXComponent";
import Comments from "@/components/post/Comments";
import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import type { Post } from "contentlayer/generated";
import { allPosts } from "contentlayer/generated";
import { QueryClient, dehydrate } from "react-query";
import { formatDate } from "@/lib/helpers";
import { getPageHitsKey } from "@/lib/constants";

type Props = {
  post: Post;
};

const BlogPost: NextPage<Props> = ({ post }) => {
  const { hits } = useHits(post.id);

  return (
    <>
      <SEO
        title={post.title}
        description={post.description}
        image={post.banner}
        date={new Date(post.date)}
        updated={post.updated ? new Date(post.updated) : undefined}
      />

      <Image
        src={post.banner}
        alt={post.title}
        title={post.title}
        width={1200}
        height={630}
        priority
        className="rounded-lg"
      />

      {post.photographer && post.unsplashLink ? (
        <p className="my-2 px-4 text-center font-roboto-slab text-base font-medium text-zinc-800 dark:text-zinc-200">
          {"Photo by "}
          <a
            href={post.unsplashLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-700 dark:text-emerald-600"
          >
            {post.photographer}
          </a>
        </p>
      ) : null}

      <h1 className="my-4 px-4 text-center font-sora text-4xl font-black text-zinc-800 dark:text-zinc-200">
        {post.title}
      </h1>

      <div className="my-2 flex flex-col items-center px-4 font-roboto-slab text-lg font-medium text-zinc-800 dark:text-zinc-200 sm:flex-row sm:justify-center">
        <p>{`Posted on ${formatDate(post.date)}`}</p>

        {post.updated && (
          <>
            <span className="hidden sm:mx-2 sm:block">&bull;</span>
            <p>{`Last updated on ${formatDate(post.updated)}`}</p>
          </>
        )}
      </div>

      <div className="my-2 flex flex-col items-center px-4 font-roboto-slab text-lg font-medium text-zinc-800 dark:text-zinc-200 sm:flex-row sm:justify-center">
        <p>{post.readingTime}</p>

        <span className="hidden sm:mx-2 sm:block">&bull;</span>

        <p>{`${hits} views`}</p>
      </div>

      <MDXComponent code={post.body.code} />

      <HitCounter />

      <Reactions />

      <Comments />
    </>
  );
};

export default BlogPost;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: allPosts.map((post) => ({ params: { id: post.id } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;
  const QUERY_KEY = getPageHitsKey(id);

  const post = allPosts.find((post) => post.id === id);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(QUERY_KEY, async () => {
    const { hits } = await prisma.page.findUnique({
      where: {
        id,
      },
      select: {
        hits: true,
      },
      rejectOnNotFound: true,
    });

    return hits;
  });

  return {
    props: {
      post,
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 3600, // 1 hour
  };
};
