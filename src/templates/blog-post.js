import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Image from "gatsby-image"
import { Link, graphql } from "gatsby"
import { rhythm } from "../utils/typography"
import { formatTags } from "../utils/helpers"
import { DiscussionEmbed } from "disqus-react"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.contentfulBlogPost
  const { previous, next } = pageContext
  const disqusConfig = {
    shortname: process.env.GATSBY_DISQUS_NAME,
    config: {
      identifier: post.slug,
      title: post.title,
    },
  }

  return (
    <Layout location={location} title={post.title}>
      <SEO
        title={post.title}
        description={post.description}
        meta={[
          {
            property: `author`,
            content: "Akhila Ariyachandra",
          },
          {
            property: `date`,
            content: post.unformattedDate,
          },
          {
            property: `keywords`,
            content: post.tags.toString(),
          },
        ]}
        image={post.banner.fluid.src}
      />

      <article>
        <header>
          <h1>{post.title}</h1>

          <div style={{ display: "flex" }}>
            <p style={{ flex: 1 }}>{post.date}</p>
            <p>{`${post.content.childMarkdownRemark.timeToRead} min read`}</p>
          </div>

          <p>{formatTags(post.tags)}</p>
        </header>

        <Image
          fluid={post.banner.fluid}
          alt="banner"
          style={{ marginBottom: rhythm(1) }}
        />

        <section
          dangerouslySetInnerHTML={{
            __html: post.content.childMarkdownRemark.html,
          }}
        />

        <hr />

        <footer style={{ margin: `${rhythm(1.5)} 0` }}>
          <h4 style={{ margin: 0 }}>
            {"Enjoyed this post or found it helpful? "}
            <a
              href="https://ko-fi.com/V7V5ZOMO"
              rel="noopener noreferrer"
              target="_blank"
            >
              Support Me on Ko-fi
            </a>
          </h4>
        </footer>

        <hr />

        <DiscussionEmbed {...disqusConfig} />

        <hr />
      </article>

      <nav style={{ margin: `${rhythm(1.5)} 0` }}>
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
    contentfulBlogPost(slug: { eq: $slug }) {
      id
      slug
      title
      description
      banner {
        fluid(maxWidth: 960, maxHeight: 480) {
          ...GatsbyContentfulFluid
        }
      }
      content {
        childMarkdownRemark {
          timeToRead
          html
        }
      }
      date(formatString: "MMMM DD, YYYY")
      unformattedDate: date
      tags
    }
  }
`
