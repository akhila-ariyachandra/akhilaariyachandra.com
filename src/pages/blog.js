import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import PostsContainer from "../components/PostsContainer";
import { graphql, useStaticQuery } from "gatsby";

const Blog = ({ location }) => {
  const { allMdx } = useStaticQuery(graphql`
    query BlogPageQuery {
      allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMMM Do, YYYY")
              title
              description
            }
            timeToRead
          }
        }
      }
    }
  `);

  const posts = allMdx.edges;

  return (
    <Layout location={location}>
      <SEO title="All posts" />

      <PostsContainer title="Blog" posts={posts} />
    </Layout>
  );
};

export default Blog;
