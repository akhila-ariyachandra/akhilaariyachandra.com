import React from "react";
import Bio from "../components/Bio";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Img from "gatsby-image";
import styled from "styled-components";
import { Link, graphql } from "gatsby";
import { Disqus } from "gatsby-plugin-disqus";
import { OutboundLink } from "gatsby-plugin-google-analytics";

const StyledDonationLink = styled.h6``;

const StyledHR = styled.hr``;

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark;
  const { previous, next } = pageContext;

  let disqusConfig = {
    url: `${data.site.siteMetadata.siteUrl + location.pathname}`,
    identifier: post.fields.slug,
    title: post.frontmatter.title,
  };

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        image={post.frontmatter.banner.childImageSharp.fixed.src}
      />
      <article>
        <header>
          <h1
            style={{
              marginBottom: 0,
            }}
          >
            {post.frontmatter.title}
          </h1>

          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <p
              style={{
                display: `block`,
                flex: 1,
              }}
            >
              {post.frontmatter.date}
            </p>

            <p
              style={{
                display: `block`,
              }}
            >
              {`${post.timeToRead} min read`}
            </p>
          </div>

          <Img
            fluid={post.frontmatter.banner.childImageSharp.fluid}
            alt={`${post.frontmatter.title} Banner`}
          />
        </header>

        <section dangerouslySetInnerHTML={{ __html: post.html }} />

        <StyledHR />

        <StyledDonationLink>
          Enjoyed the post or found it useful?{" "}
          <OutboundLink
            href={data.site.siteMetadata.donationLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Please consider buying me a coffee.
          </OutboundLink>
        </StyledDonationLink>

        <StyledHR />

        <Disqus config={disqusConfig} />

        <StyledHR />

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
        donationLink
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM Do, YYYY")
        description
        banner {
          childImageSharp {
            fluid(maxWidth: 1200, maxHeight: 600) {
              ...GatsbyImageSharpFluid
            }
            fixed(width: 1200, height: 630) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
      timeToRead
    }
  }
`;
