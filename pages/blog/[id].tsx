import React from "react";
import hydrate from "next-mdx-remote/hydrate";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import SpecialBlock from "@/components/post/SpecialBlock";
import Image from "next/image";
import HitCounter from "@/components/post/HitCounter";
import PostImage from "@/components/post/PostImage";
import Code from "@/components/code/Code";
import Reactions from "@/components/Reactions";
import CodeSandboxWrapper from "@/components/post/CodeSandboxWrapper";
import Iframe from "@/components/post/Iframe";
import Comments from "@/components/Comments";
import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import type { Post } from "@/lib/types";
import { getAllPostIds, getPostData } from "@/lib/posts";
import { FaGithub } from "react-icons/fa";

import styles from "@/styles/post.module.scss";

const mdxComponents = {
  SpecialBlock,
  pre: (props) => <Code {...props} />,
  PostImage,
  CodeSandboxWrapper,
  Iframe,
};

type Props = {
  postData: Post;
};

const BlogPost: NextPage<Props> = ({ postData }) => {
  const content = hydrate(postData.content, {
    components: mdxComponents,
  });

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

      <p className="my-2 px-4 text-center dark:text-gray-200 text-gray-800 text-lg font-medium">
        {`Posted on ${postData.formattedDate}`}
      </p>

      {postData.updated ? (
        <p className="my-2 px-4 text-center dark:text-gray-200 text-gray-800 text-lg font-medium">
          {`Last updated on ${postData.formattedUpdated}`}
        </p>
      ) : null}

      {postData.sourceCode ? (
        <a
          className="flex flex-row items-center justify-center my-4 p-4 dark:text-blue-500 text-blue-700 text-2xl font-medium space-x-4"
          href={postData.sourceCode}
        >
          <FaGithub />
          <span>Check out the source code here</span>
        </a>
      ) : null}

      <div
        className={`prose dark:prose-dark max-w-none p-4 ${styles.prose} full-bleed wrapper`}
      >
        {content}
      </div>

      <HitCounter id={postData.id} title={postData.title} />

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
  const id = params.id;
  const postData = await getPostData(id);

  return {
    props: {
      postData,
    },
  };
};
