import Layout from "../components/Layout";
import PostLink from "../components/PostLink";
import SEO from "../components/SEO";
import readingTime from "reading-time";
import { NextPage, GetStaticProps } from "next";
import { client } from "../util/cms";
import { BlogPost } from "../util/types";

type Props = {
  blogPosts: [BlogPost];
};

const Blog: NextPage<Props> = ({ blogPosts }) => {
  return (
    <Layout>
      <SEO
        title="Blog"
        description="A Blog by Akhila Ariyachandra talking about React, JavaScript & Programming"
      />

      {blogPosts.map(blogPost => (
        <PostLink blogPost={blogPost} key={blogPost.slug} />
      ))}
    </Layout>
  );
};

export default Blog;

export const getStaticProps: GetStaticProps = async () => {
  const dayjs = require("dayjs");
  const advancedFormat = require("dayjs/plugin/advancedFormat");
  dayjs.extend(advancedFormat);

  const results = await client.getEntries({
    content_type: "blogPost",
    order: "-fields.date",
  });

  const blogPosts = results.items.map(item => {
    const blogPost: any = item.fields;

    blogPost.date = dayjs(blogPost.date).format("Do MMMM YYYY");
    blogPost.banner = blogPost.banner.fields;
    blogPost.readingTime = readingTime(blogPost.content).text;

    return blogPost;
  });

  return {
    props: { blogPosts },
  };
};
