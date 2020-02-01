import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PostList from "../components/PostList"
import { rhythm } from "../utils/typography"
import { Link, graphql } from "gatsby"

const IndexPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allContentfulBlogPost.nodes
  const projects = data.allContentfulProject.nodes

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={siteTitle} />

      <div style={{ padding: `${rhythm(4)} 0` }}>
        <h1>Hi.</h1>

        <p>
          I'm Akhila - a Web Developer trying to share his love and knowledge of
          React, JavaScript, and Programming.
        </p>
      </div>

      <div>
        <div style={{ display: "flex" }}>
          <h2 style={{ flex: 1, margin: 0 }}>Latest Posts</h2>

          <Link to="/blog" style={{ textDecoration: "none" }}>
            Read all posts
          </Link>
        </div>

        <hr style={{ marginTop: rhythm(1) }} />

        <PostList posts={posts} />
      </div>

      <div style={{ margin: `${rhythm(2)} 0` }}>
        <h2 style={{ margin: 0 }}>Projects</h2>

        <hr style={{ marginTop: rhythm(1) }} />
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
