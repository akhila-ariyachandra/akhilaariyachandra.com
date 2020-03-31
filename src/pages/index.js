import React from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import PostLink from "../components/PostLink";
import { Link, graphql } from "gatsby";
import { rhythm } from "../utils/typography";

const BlogIndex = ({ data, location }) => {
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout>
      <SEO
        title="Akhila Ariyachandra"
        meta={[
          {
            property: "og:image",
            content: `${location.origin}${data.seoPic.childImageSharp.fixed.src}`,
          },
          { property: "og:image:width", content: 1200 },
          { property: "og:image:height", content: 630 },
          { property: "og:url", content: location.href },
        ]}
      />

      <div style={{ marginTop: rhythm(5), marginBottom: rhythm(5) }}>
        <h1>Hi.</h1>

        <p>
          I'm Akhila - a Web Developer trying to share his love and knowledge of
          React, JavaScript, and Programming.
        </p>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <h3 style={{ flex: 1 }}>Latest Posts</h3>

        <h4>
          <Link style={{ boxShadow: `none` }} to="/blog/">
            Read all posts
          </Link>
        </h4>
      </div>

      <hr />

      {posts.map(({ node }) => (
        <PostLink node={node} key={node.id} />
      ))}
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query IndexPageQuery {
    seoPic: file(absolutePath: { regex: "/cover-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 1200, height: 630) {
          src
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 3
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
          timeToRead
        }
      }
    }
  }
`;
