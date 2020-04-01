import React from "react";
import Layout from "../components/Layout";
import PostLink from "../components/PostLink";
import SEO from "../components/SEO";
import { graphql, useStaticQuery } from "gatsby";

const Blog = () => {
  const { allMarkdownRemark } = useStaticQuery(graphql`
    query BlogPageQuery {
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
  `);

  const posts = allMarkdownRemark.edges;

  return (
    <Layout>
      <SEO
        title="Blog"
        description="A blog by Akhila Ariyachandra talking about JavaScript, React & Web Development"
      />

      {posts.map(({ node }) => (
        <PostLink node={node} key={node.id} />
      ))}
    </Layout>
  );
};

export default Blog;
