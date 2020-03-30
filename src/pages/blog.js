import React from "react";
import Layout from "../components/Layout";
import PostLink from "../components/PostLink";
import SEO from "../components/SEO";
import { graphql } from "gatsby";

const Blog = ({ data, location }) => {
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout>
      <SEO
        title="Blog"
        meta={[
          {
            property: "og:image",
            content: `${location.origin}${data.seoPic.childImageSharp.fixed.src}`,
          },
        ]}
      />

      {posts.map(({ node }) => (
        <PostLink node={node} key={node.id} />
      ))}
    </Layout>
  );
};

export default Blog;

export const pageQuery = graphql`
  query BlogPageQuery {
    seoPic: file(absolutePath: { regex: "/cover-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 1200, height: 630) {
          src
        }
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
