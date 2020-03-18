import Layout from "../components/Layout";
import Skeleton from "@material-ui/lab/Skeleton";
import dynamic from "next/dynamic";
const MarkdownContainer = dynamic(
  () => import("../components/MarkdownContainer"),
  { loading: () => <Skeleton variant="rect" width="100%" height="20rem" /> }
);
import readingTime from "reading-time";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import SEO from "../components/SEO";
import BannerImage from "../components/BannerImage";
import Link from "next/link";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { client } from "../util/cms";
import { BlogPost } from "../util/types";
import { DiscussionEmbed } from "disqus-react";
import { formatTags } from "../util/helpers";

dayjs.extend(advancedFormat);

type OtherPost = {
  title: string;
  slug: string;
};

type Props = {
  blogPost: BlogPost;
  next: OtherPost;
  previous: OtherPost;
};

const Post: NextPage<Props> = ({ blogPost, next, previous }) => {
  console.log("> next: ", next);
  console.log("> previous: ", previous);

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

          <BannerImage
            src={blogPost.banner.file.url}
            alt={blogPost.banner.title}
          />
        </header>

        <section>
          <MarkdownContainer source={blogPost.content} />
        </section>
      </article>

      <hr />

      <DiscussionEmbed
        shortname={process.env.GATSBY_DISQUS_NAME}
        config={{
          url: process.env.siteUrl,
          identifier: blogPost.slug,
          title: blogPost.title,
        }}
      />

      <hr />

      <nav>
        {previous ? (
          <Link href="/[slug]" as={`/${previous.slug}`}>
            <h2 className="navigation link">{`← ${previous.title}`}</h2>
          </Link>
        ) : null}

        {next ? (
          <Link href="/[slug]" as={`/${next.slug}`}>
            <h2
              className="navigation link"
              id="next-post"
            >{`${next.title} →`}</h2>
          </Link>
        ) : null}
      </nav>

      <hr />

      <style jsx>{`
        nav {
          margin-top: 3rem;
          margin-bottom: 3rem;
        }

        .navigation {
          cursor: pointer;
        }

        #next-post {
          text-align: right;
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

  const allPosts = await client.getEntries({
    content_type: "blogPost",
    order: "-fields.date",
  });

  let next: OtherPost;
  let previous: OtherPost;

  allPosts.items.map((item, index) => {
    const blogPost: any = item.fields;

    if (context.params.slug == blogPost.slug) {
      if (index == 0) {
        previous = null;
      } else {
        const previousPost: any = allPosts.items[index - 1].fields;

        previous = {
          title: previousPost.title,
          slug: previousPost.slug,
        };
      }

      if (index == allPosts.items.length - 1) {
        next = null;
      } else {
        const nextPost: any = allPosts.items[index + 1].fields;

        next = {
          title: nextPost.title,
          slug: nextPost.slug,
        };
      }
    }
  });

  return {
    props: { blogPost: blogPosts[0], next, previous },
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
