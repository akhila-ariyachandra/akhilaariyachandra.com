import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allContentfulBlogPost.nodes

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={siteTitle} />

      {posts.map(post => {
        const title = post.title || post.slug
        return (
          <article key={post.slug}>
            <header>
              <h3>
                <Link style={{ boxShadow: `none` }} to={post.slug}>
                  {title}
                </Link>
              </h3>
              <small>{post.date}</small>
            </header>
            <section>
              <p>{post.description}</p>
            </section>
          </article>
        )
      })}
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
      }
    }
  }
`
