import React from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import PostLink from "../components/PostLink";
import Img from "gatsby-image";
import ProjectLink from "../components/ProjectLink";
import TechnologyBlock from "../components/TechnologyBlock";
import { Link, graphql, useStaticQuery } from "gatsby";

const BlogIndex = ({ location }) => {
  const { picture, allMarkdownRemark, site } = useStaticQuery(graphql`
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
        limit: 4
      ) {
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
      site {
        siteMetadata {
          projects {
            title
            url
            description
          }
          technologies {
            name
            background
            text
            link
          }
        }
      }
    }
  `);

  const posts = allMarkdownRemark.edges;
  const projects = site.siteMetadata.projects;
  const technologies = site.siteMetadata.technologies;

  return (
    <Layout location={location}>
      <SEO title="Akhila Ariyachandra" />

      <div className="container my-20 w-full max-w-3xl ">
        <Img
          fluid={picture.childImageSharp.fluid}
          alt="Akhila Ariyachandra"
          className="block mx-auto rounded-lg mb-2"
          style={{ maxWidth: 600 }}
          imgStyle={{ maxWidth: 600 }}
        />

        <h1 className="text-4xl font-semibold">Hi.</h1>

        <p className="text-lg font-normal">
          I'm Akhila - a Web Developer trying to share his love and knowledge of
          React, JavaScript, and Programming.
        </p>
      </div>

      <div className="my-16 w-full">
        <h3 className="text-3xl font-semibold">Technologies I work with</h3>

        <hr className="my-3" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {technologies.map((technology) => (
            <TechnologyBlock technology={technology} key={technology.name} />
          ))}
        </div>
      </div>

      <div className="my-16 w-full">
        <div className="flex items-center">
          <h3 className="text-3xl font-semibold flex-1">Latest Posts</h3>

          <h4 className="text-xl font-medium transition duration-200 transform hover:text-green-600">
            <Link className="shadow-none" to="/blog/">
              Read all posts
            </Link>
          </h4>
        </div>

        <hr className="my-3" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {posts.map(({ node }) => (
            <PostLink node={node} key={node.id} />
          ))}
        </div>
      </div>

      <div className="my-16 w-full">
        <h3 className="text-3xl font-semibold">Projects</h3>

        <hr className="my-3" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projects.map((project) => (
            <ProjectLink project={project} key={project.url} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default BlogIndex;
