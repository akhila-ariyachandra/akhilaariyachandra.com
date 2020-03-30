import React from "react";
import Bio from "../components/Bio";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Img from "gatsby-image";
import { Link, graphql } from "gatsby";
import { rhythm, scale } from "../utils/typography";
import { Disqus } from "gatsby-plugin-disqus";

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark;
  const { previous, next } = pageContext;

  let disqusConfig = {
    url: `${data.site.siteMetadata.siteUrl + location.pathname}`,
    identifier: post.id,
    title: post.frontmatter.title,
  };

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        meta={[
          {
            property: "og:image",
            content: `${location.origin}${post.frontmatter.banner.childImageSharp.fixed.src}`,
          },
        ]}
      />
      <article>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
          >
            {post.frontmatter.title}
          </h1>

          <div style={{ display: "flex", alignItems: "center" }}>
            <p
              style={{
                ...scale(-1 / 5),
                display: `block`,
                marginBottom: rhythm(1),
                flex: 1,
              }}
            >
              {post.frontmatter.date}
            </p>

            <p
              style={{
                ...scale(-1 / 5),
                display: `block`,
                marginBottom: rhythm(1),
              }}
            >
              {`${post.timeToRead} min read`}
            </p>
          </div>

          <Img
            fluid={post.frontmatter.banner.childImageSharp.fluid}
            alt={`${post.frontmatter.title} Banner`}
            style={{ marginBottom: rhythm(1) }}
          />
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />

        <Disqus config={disqusConfig} />

        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />

        <footer>
          <Bio />
        </footer>
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
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        banner {
          childImageSharp {
            fluid(maxWidth: 1200, maxHeight: 600) {
              ...GatsbyImageSharpFluid
            }
            fixed(width: 1200, height: 600) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
      timeToRead
    }
  }
`;
