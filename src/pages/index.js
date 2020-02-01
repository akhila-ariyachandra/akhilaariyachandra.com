import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostList from "../components/PostList"

const IndexPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allContentfulBlogPost.nodes
  const projects = data.allContentfulProject.nodes

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={siteTitle} />

      <div>
        <h1>Hi.</h1>

        <p>
          I'm Akhila - a Web Developer trying to share his love and knowledge of
          React, JavaScript, and Programming.
        </p>
      </div>

      <div>
        <h2>Latest Posts</h2>

        <Link to="/blog">Read all posts</Link>

        <hr />

        <PostList posts={posts} />
      </div>

      <div>
        <h2>Projects</h2>

        <hr />
        {projects.map(project => (
          <a href={project.link} rel="noopener noreferrer" target="_blank">
            <h3>{project.name}</h3>
          </a>
        ))}
      </div>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulBlogPost(sort: { order: DESC, fields: date }, limit: 3) {
      nodes {
        slug
        title
        description
        date
        content {
          content
        }
      }
    }
    allContentfulProject {
      nodes {
        name
        link
      }
    }
  }
`
