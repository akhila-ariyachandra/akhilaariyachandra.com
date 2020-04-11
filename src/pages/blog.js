import React from "react";
import Layout from "../components/Layout";
import PostLink from "../components/PostLink";
import SEO from "../components/SEO";
import Img from "gatsby-image";
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
              banner {
                childImageSharp {
                  fluid(maxWidth: 600, maxHeight: 300) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
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

      <div className="my-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {posts.map(({ node }) => (
          <PostLink node={node} key={node.id} />
        ))}
      </div>
    </Layout>
  );
};

export default Blog;
