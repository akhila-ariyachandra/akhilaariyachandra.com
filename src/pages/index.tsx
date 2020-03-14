import Layout from "../components/Layout";
import PostLink from "../components/PostLink";
import Link from "next/link";
import { NextPage, GetStaticProps } from "next";
import { client } from "../util/cms";
import { BlogPost } from "../util/types";

type Props = {
  blogPosts: [BlogPost];
};

const Index: NextPage<Props> = ({ blogPosts }) => {
  return (
    <Layout>
      <div>
        <h1>Hi.</h1>

        <p>
          I'm Akhila - a Web Developer trying to share his love and knowledge of
          React, JavaScript, and Programming.
        </p>
      </div>

      <div>
        <div style={{ display: "flex" }}>
          <h2 style={{ flex: 1, margin: 0 }}>Latest Posts</h2>

          <Link href="/blog">
            <a>Read all posts</a>
          </Link>
        </div>

        <hr />

        {blogPosts.map(blogPost => (
          <PostLink blogPost={blogPost} key={blogPost.slug} />
        ))}
      </div>
    </Layout>
  );
};

export default Index;

export const getStaticProps: GetStaticProps = async () => {
  const results = await client.getEntries({
    content_type: "blogPost",
    order: "-fields.date",
    limit: 3,
  });

  const blogPosts = results.items.map(item => {
    const blogPost: any = item.fields;

    blogPost.banner = blogPost.banner.fields;

    return blogPost;
  });

  return {
    props: { blogPosts },
  };
};
