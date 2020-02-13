import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PostList from "../components/PostList"
import { graphql } from "gatsby"

const Blog = ({ data, location }) => {
  const posts = data.allContentfulBlogPost.nodes

  return (
    <Layout location={location} title="Blog">
      <SEO
        title="Blog"
        description="A Blog by Akhila Ariyachandra talking about React, JavaScript & Programming"
      />

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
        date(formatString: "MMMM D, YYYY")
        content {
          childMarkdownRemark {
            timeToRead
            html
          }
        }
        tags
      }
    }
  }
`
