import React from "react";
import Layout from "src/components/Layout";
import SEO from "src/components/SEO";
import SpecialBlock from "src/components/post/SpecialBlock";
import Image from "next/image";
import HitCounter from "src/components/post/HitCounter";
import PostImage from "src/components/post/PostImage";
import Code from "src/components/code/Code";
import Reactions from "src/components/Reactions";
import hydrate from "next-mdx-remote/hydrate";
import CodeSandboxWrapper from "src/components/post/CodeSandboxWrapper";
import Iframe from "src/components/post/Iframe";
import Comments from "src/components/Comments";
import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import type { Post } from "src/lib/types";
import { getAllPostIds, getPostData } from "src/lib/posts";

import styles from "src/styles/post.module.scss";

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
        <p className="my-2 px-4 text-center text-black dark:text-white text-base font-medium">
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

      <h1 className="pseudo-full-bleed my-4 px-4 text-center text-black dark:text-white text-4xl font-black">
        {postData.title}
      </h1>

      <p className="my-2 px-4 text-center text-black dark:text-white text-lg font-medium">
        {`Posted on ${postData.formattedDate}`}
      </p>

      {postData.updated ? (
        <p className="my-2 px-4 text-center text-black dark:text-white text-lg font-medium">
          {`Last updated on ${postData.formattedUpdated}`}
        </p>
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
