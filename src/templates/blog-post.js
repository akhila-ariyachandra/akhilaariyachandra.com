import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ReactMarkdown from "react-markdown"
import readingTime from "reading-time"
import Image from "gatsby-image"
import CodeBlock from "../components/CodeBlock"
import { Link, graphql } from "gatsby"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.contentfulBlogPost
  const { previous, next } = pageContext

  return (
    <Layout location={location} title={post.title}>
      <SEO title={post.title} description={post.description} />

      <article>
        <header>
          <h1>{post.title}</h1>
          <p>{post.date}</p>
          <p>{readingTime(post.content.content).text}</p>
        </header>

        <Image fluid={post.banner.fluid} alt="banner" />

        <ReactMarkdown
          source={post.content.content}
          renderers={{ code: CodeBlock }}
        />

        <footer>footer</footer>
      </article>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.slug} rel="prev">
                ← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.slug} rel="next">
                {next.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulBlogPost(slug: { eq: $slug }) {
      id
      title
      description
      banner {
        fluid(maxWidth: 960, maxHeight: 480) {
          ...GatsbyContentfulFluid
        }
      }
      content {
        content
      }
      date(formatString: "MMMM DD, YYYY")
    }
  }
`
