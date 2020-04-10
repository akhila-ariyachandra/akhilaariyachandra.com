import React from "react";
import Bio from "../components/Bio";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Img from "gatsby-image";
import { Link, graphql } from "gatsby";
import { Disqus } from "gatsby-plugin-disqus";
import { OutboundLink } from "gatsby-plugin-google-analytics";

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
        <header className="my-5">
          <h1 className="text-4xl font-bold">{post.frontmatter.title}</h1>

          <div className="flex items-center">
            <p className="flex-1 text-lg">{post.frontmatter.date}</p>

            <p className="text-lg">{`${post.timeToRead} min read`}</p>
          </div>

          <Img
            fluid={post.frontmatter.banner.childImageSharp.fluid}
            alt={`${post.frontmatter.title} Banner`}
            className="block mx-auto my-3 rounded-lg"
            style={{ maxWidth: 1200 }}
            imgStyle={{ maxWidth: 1200 }}
          />
        </header>

        <section dangerouslySetInnerHTML={{ __html: post.html }} />

        <footer>
          <hr className="my-3" />

          <h6 className="text-xl font-medium">
            Enjoyed the post or found it useful?{" "}
            <OutboundLink
              href={data.site.siteMetadata.donationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Please consider buying me a coffee.
            </OutboundLink>
          </h6>

          <hr className="my-3" />

          <Bio />

          <hr className="my-3" />

          <Disqus config={disqusConfig} />

          <hr className="my-3" />
        </footer>
      </article>

      <nav className="my-8">
        <ul className="flex flex-wrap justify-between list-none p-0">
          <li className="text-2xl font-medium">
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>

          <li className="text-2xl font-medium">
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
