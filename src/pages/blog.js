import React from "react";
import Layout from "../components/Layout";
import PostLink from "../components/PostLink";
import SEO from "../components/SEO";
import { graphql } from "gatsby";

const Blog = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout>
      <SEO />

      {posts.map(({ node }) => (
        <PostLink node={node} />
      ))}
    </Layout>
  );
};

export default Blog;

export const pageQuery = graphql`
  query BlogPageQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
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
