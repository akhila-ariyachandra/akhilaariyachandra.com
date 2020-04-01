import React from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import PostLink from "../components/PostLink";
import Img from "gatsby-image";
import { Link, graphql, useStaticQuery } from "gatsby";
import { rhythm } from "../utils/typography";

const BlogIndex = () => {
  const { picture, allMarkdownRemark } = useStaticQuery(graphql`
    query IndexPageQuery {
      picture: file(absolutePath: { regex: "/cover-pic.jpg/" }) {
        childImageSharp {
          fluid(maxWidth: 1200, maxHeight: 600) {
            ...GatsbyImageSharpFluid
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
  `);

  const posts = allMarkdownRemark.edges;

  return (
    <Layout>
      <SEO title="Akhila Ariyachandra" />

      <div style={{ marginTop: rhythm(3), marginBottom: rhythm(3) }}>
        <Img
          fluid={picture.childImageSharp.fluid}
          alt="Akhila Ariyachandra"
          style={{
            marginBottom: rhythm(1),
            borderRadius: rhythm(0.25),
            maxWidth: rhythm(20),
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />

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
