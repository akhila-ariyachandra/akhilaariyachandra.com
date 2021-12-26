import React from "react";
import useHits from "@/hooks/use-hits";
import SEO from "@/components/SEO";
import Image from "next/image";
import HitCounter from "@/components/post/HitCounter";
import Reactions from "@/components/post/Reactions";
import MDXComponent from "@/components/post/MDXComponent";
import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import type { Post } from ".contentlayer/types";
import { allPosts } from ".contentlayer/data";
import { formatDate } from "@/lib/helpers";

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
        <p className="my-2 px-4 text-center dark:text-gray-200 text-gray-800 font-roboto-slab text-base font-medium">
          {"Photo by "}
          <a
            href={post.unsplashLink}
            target="_blank"
            rel="noopener noreferrer"
            className="dark:text-emerald-600 text-emerald-700"
          >
            {post.photographer}
          </a>
        </p>
      ) : null}

      <h1 className="my-4 px-4 text-center dark:text-gray-200 text-gray-800 font-sora text-4xl font-black">
        {post.title}
      </h1>

      <div className="flex flex-col items-center my-2 px-4 dark:text-gray-200 text-gray-800 font-roboto-slab text-lg font-medium sm:flex-row sm:justify-center">
        <p>{`Posted on ${formatDate(post.date)}`}</p>

        {post.updated && (
          <>
            <span className="hidden sm:block sm:mx-2">&bull;</span>
            <p>{`Last updated on ${formatDate(post.updated)}`}</p>
          </>
        )}
      </div>

      <div className="flex flex-col items-center my-2 px-4 dark:text-gray-200 text-gray-800 font-roboto-slab text-lg font-medium sm:flex-row sm:justify-center">
        <p>{post.readingTime}</p>

        <span className="hidden sm:block sm:mx-2">&bull;</span>

        <p>{`${hits} views`}</p>
      </div>

      <MDXComponent code={post.body.code} />

      <HitCounter />

      <Reactions />
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
  const post = allPosts.find((post) => post.id === params?.id);

  return {
    props: {
      post,
    },
  };
};
