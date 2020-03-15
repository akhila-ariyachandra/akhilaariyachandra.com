import Layout from "../components/Layout";
import dynamic from "next/dynamic";
const ReactMarkdown = dynamic(() => import("react-markdown"));
import readingTime from "reading-time";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import SEO from "../components/SEO";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { client } from "../util/cms";
import { BlogPost } from "../util/types";
import { DiscussionEmbed } from "disqus-react";
import { formatTags } from "../util/helpers";

dayjs.extend(advancedFormat);

type Props = {
  blogPost: BlogPost;
};

const Post: NextPage<Props> = ({ blogPost }) => {
  return (
    <Layout>
      <SEO
        title={blogPost.title}
        description={blogPost.description}
        meta={[
          {
            property: "author",
            content: "Akhila Ariyachandra",
          },
          {
            property: `date`,
            content: blogPost.date.toString(),
          },
          {
            property: `keywords`,
            content: formatTags(blogPost.tags),
          },
        ]}
        image={blogPost.banner.file.url}
      />

      <article>
        <header>
          <h1>{blogPost.title}</h1>

          <div style={{ display: "flex" }}>
            <p style={{ flex: 1 }}>
              {dayjs(blogPost.date).format("Do MMMM YYYY")}
            </p>
            <p>{readingTime(blogPost.content).text}</p>
          </div>

          <p>{formatTags(blogPost.tags)}</p>

          <img
            src={`${blogPost.banner.file.url}?fm=jpg&fl=progressive`}
            alt={blogPost.banner.title}
            loading="lazy"
            width="1200"
            height="600"
            id="banner"
          />
        </header>

        <section>
          <ReactMarkdown source={blogPost.content} />
        </section>
      </article>

      <hr />

      <DiscussionEmbed
        shortname={process.env.GATSBY_DISQUS_NAME}
        config={{
          url: `${process.env.siteUrl}/${blogPost.slug}`,
          identifier: blogPost.slug,
          title: blogPost.title,
        }}
      />

      <hr />

      <style jsx>{`
        #banner {
          height: auto;
          max-width: 100%;
        }
      `}</style>
    </Layout>
  );
};

export default Post;

export const getStaticProps: GetStaticProps = async context => {
  const results = await client.getEntries({
    content_type: "blogPost",
    "fields.slug": context.params.slug,
  });

  const blogPosts = results.items.map(item => {
    const blogPost: any = item.fields;

    blogPost.banner = blogPost.banner.fields;

    return blogPost;
  });

  return {
    props: { blogPost: blogPosts[0] },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const results = await client.getEntries({
    content_type: "blogPost",
  });

  const paths = results.items.map(item => {
    const blogPost: any = item.fields;

    return {
      params: {
        slug: blogPost.slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};
