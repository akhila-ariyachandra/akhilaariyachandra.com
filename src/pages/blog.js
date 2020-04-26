import React from "react";
import Layout from "../components/layout";
import BlogPost from "../components/BlogPost";
import SEO from "../components/seo";
import { graphql, useStaticQuery } from "gatsby";

const Blog = () => {
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
    <Layout title="Akhila Ariyachandra">
      <SEO title="All posts" />

      {posts.map(({ node }) => (
        <BlogPost key={node.id} node={node} />
      ))}
    </Layout>
  );
};

export default Blog;
