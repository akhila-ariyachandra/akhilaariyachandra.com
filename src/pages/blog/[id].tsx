import React from "react";
import dynamic from "next/dynamic";
import useHits from "@/hooks/use-hits";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Image from "next/image";
const HitCounter = dynamic(() => import("@/components/post/HitCounter"));
const Reactions = dynamic(() => import("@/components/post/Reactions"));
const Comments = dynamic(() => import("@/components/post/Comments"));
import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import type { Post } from "@/lib/types";
import { getAllPostIds, getPostData } from "@/lib/posts";
import { mdxComponents } from "@/lib/mdx";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { getPageHits } from "@/lib/hits";
import { MDXRemote } from "next-mdx-remote";

import styles from "@/styles/post.module.scss";

type Props = {
  postData: Post;
};

const BlogPost: NextPage<Props> = ({ postData }) => {
  const { data } = useHits(postData.id);

  return (
    <Layout>
      <SEO
        title={postData.title}
        description={postData.description}
        image={postData.banner}
        date={new Date(postData.date)}
        updated={postData.updated ? new Date(postData.updated) : undefined}
      />

      <div
        className={`my-4 pseudo-full-bleed overflow-hidden ${styles.bannerContainer}`}
      >
        <Image
          src={postData.banner}
          alt={postData.title}
          title={postData.title}
          width={1200}
          height={630}
          priority
        />
      </div>

      {postData.photographer && postData.unsplash_link ? (
        <p className="my-2 px-4 text-center dark:text-gray-200 text-gray-800 text-base font-medium">
          {"Photo by "}
          <a
            href={postData.unsplash_link}
            target="_blank"
            rel="noopener noreferrer"
            className="dark:text-green-600 text-green-700"
          >
            {postData.photographer}
          </a>
        </p>
      ) : null}

      <h1 className="pseudo-full-bleed my-4 px-4 text-center dark:text-gray-200 text-gray-800 text-4xl font-black">
        {postData.title}
      </h1>

      <div className="flex flex-col items-center my-2 px-4 dark:text-gray-200 text-gray-800 text-lg font-medium sm:flex-row sm:justify-center">
        <p>{`Posted on ${postData.formattedDate}`}</p>

        {postData.updated && (
          <>
            <span className="hidden sm:block sm:mx-2">&bull;</span>
            <p>{`Last updated on ${postData.formattedUpdated}`}</p>
          </>
        )}
      </div>

      <div className="flex flex-col items-center my-2 px-4 dark:text-gray-200 text-gray-800 text-lg font-medium sm:flex-row sm:justify-center">
        <p>{postData.readingTime}</p>

        <span className="hidden sm:block sm:mx-2">&bull;</span>

        <p>{`${data} views`}</p>
      </div>

      <div
        className={`prose dark:prose-dark max-w-none p-4 ${styles.prose} full-bleed wrapper`}
      >
        <MDXRemote {...postData.content} components={mdxComponents} lazy />
      </div>

      <HitCounter />

      <Reactions />

      <Comments />
    </Layout>
  );
};

export default BlogPost;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params.id as string;
  const postData = await getPostData(id);

  const queryClient = new QueryClient();

  // Prefetch page hits
  await queryClient.prefetchQuery(["pageHits", id], () => getPageHits(id));

  return {
    props: {
      postData,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
