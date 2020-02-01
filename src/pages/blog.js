import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostList from "../components/PostList"

const Blog = ({ data, location }) => {
  const posts = data.allContentfulBlogPost.nodes

  return (
    <Layout location={location} title="Blog">
      <SEO title="Blog" />

      <PostList posts={posts} />
    </Layout>
  )
}

export default Blog

export const pageQuery = graphql`
  query {
    allContentfulBlogPost(sort: { order: DESC, fields: date }) {
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
  }
`
