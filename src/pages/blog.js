import React from "react";
import Layout from "../components/Layout";
import PostLink from "../components/PostLink";
import SEO from "../components/SEO";
import { graphql, useStaticQuery } from "gatsby";

const Blog = ({ location }) => {
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

  const posts = allMarkdownRemark.edges;

  return (
    <Layout location={location}>
      <SEO
        title="Blog"
        description="A blog by Akhila Ariyachandra talking about JavaScript, React & Web Development"
      />

      <h1 className="text-5xl font-bold text-left mb-5 w-full mt-8">Blog</h1>

      <div className="grid grid-cols-1 gap-4 w-full">
        {posts.map(({ node }) => (
          <PostLink node={node} key={node.id} dark={true} />
        ))}
      </div>
    </Layout>
  );
};

export default Blog;
