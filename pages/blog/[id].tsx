import React from "react";
import dynamic from "next/dynamic";
import useHits from "@/hooks/use-hits";
import SEO from "@/components/SEO";
import Image from "next/image";
import Link from "next/link";
const HitCounter = dynamic(() => import("@/components/post/HitCounter"));
const Reactions = dynamic(() => import("@/components/post/Reactions"));
import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import type { Post } from "@/lib/types";
import { useRouter } from "next/router";
import {
  getAllPostIds,
  getPostData,
  getBlurredBanner,
  getLatestPost,
} from "@/lib/posts";
import { mdxComponents } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote";

import styles from "@/styles/post.module.scss";

type Props = {
  postData: Post;
  blurredBanner: string;
  latestPost: Post;
};

const BlogPost: NextPage<Props> = ({ postData, blurredBanner, latestPost }) => {
  const router = useRouter();
  const { hits } = useHits(postData.id);

  return (
    <>
      <SEO
        title={postData.title}
        description={postData.description}
        image={postData.banner}
        date={new Date(postData.date)}
        updated={postData.updated ? new Date(postData.updated) : undefined}
      />

      <div className={styles.bannerContainer}>
        <Image
          src={postData.banner}
          alt={postData.title}
          title={postData.title}
          width={1200}
          height={630}
          placeholder="blur"
          blurDataURL={blurredBanner}
          priority
        />
      </div>

      {postData.photographer && postData.unsplash_link ? (
        <p className="my-2 px-4 text-center dark:text-gray-200 text-gray-800 font-roboto-slab text-base font-medium">
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

      <h1 className="my-4 px-4 text-center dark:text-gray-200 text-gray-800 font-sora text-4xl font-black">
        {postData.title}
      </h1>

      <div className="flex flex-col items-center my-2 px-4 dark:text-gray-200 text-gray-800 font-roboto-slab text-lg font-medium sm:flex-row sm:justify-center">
        <p>{`Posted on ${postData.formattedDate}`}</p>

        {postData.updated && (
          <>
            <span className="hidden sm:block sm:mx-2">&bull;</span>
            <p>{`Last updated on ${postData.formattedUpdated}`}</p>
          </>
        )}
      </div>

      <div className="flex flex-col items-center my-2 px-4 dark:text-gray-200 text-gray-800 font-roboto-slab text-lg font-medium sm:flex-row sm:justify-center">
        <p>{postData.readingTime}</p>

        <span className="hidden sm:block sm:mx-2">&bull;</span>

        <p>{`${hits} views`}</p>
      </div>

      <div className={`prose dark:prose-dark max-w-none my-4 ${styles.prose}`}>
        <MDXRemote {...postData.content} components={mdxComponents} />
      </div>

      <HitCounter />

      <Reactions />

      {router.query.id !== latestPost.id && (
        <div className="flex flex-col p-4 dark:bg-gray-800 bg-green-200 rounded-lg space-y-2">
          <p className="mb-4 dark:text-gray-200 text-gray-800 font-sora text-lg font-medium">
            Check out my latest post...
          </p>

          <Link href={`/blog/${latestPost.id}`}>
            <a className="dark:text-green-500 text-green-800 font-sora text-3xl font-semibold">
              {latestPost.title}
            </a>
          </Link>

          <p className="dark:text-gray-200 text-gray-800 font-roboto-slab text-xl font-medium">
            {latestPost.formattedDate}
          </p>
        </div>
      )}
    </>
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

  // Get blurred banner
  const blurredBanner = await getBlurredBanner(postData.banner);

  // Get latest port
  const latestPost = await getLatestPost();

  return {
    props: {
      postData,
      blurredBanner,
      latestPost,
    },
  };
};
