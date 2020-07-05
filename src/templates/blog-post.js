import React from "react";
import Bio from "../components/bio";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Img from "gatsby-image";
import SpecialBlock from "../components/SpecialBlock";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import { Link, graphql } from "gatsby";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  WorkplaceIcon,
} from "react-share";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Disqus } from "gatsby-plugin-disqus";
import {
  IfWebMonetized,
  IfNotWebMonetized,
  IfWebMonetizationPending,
} from "react-web-monetization";
import { OutboundLink } from "gatsby-plugin-google-analytics";

const components = { SpecialBlock, OutboundLink };

const ShareContainer = ({ url }) => {
  return (
    <div className="my-5 flex-no-wrap">
      <FacebookShareButton url={url}>
        <FacebookIcon className="h-8 w-8 sm:h-10 sm:w-10 rounded" />
      </FacebookShareButton>

      <TwitterShareButton url={url}>
        <TwitterIcon className="h-8 w-8 sm:h-10 sm:w-10 rounded ml-2" />
      </TwitterShareButton>

      <LinkedinShareButton url={url}>
        <LinkedinIcon className="h-8 w-8 sm:h-10 sm:w-10 rounded ml-2" />
      </LinkedinShareButton>

      <WorkplaceShareButton url={url}>
        <WorkplaceIcon className="h-8 w-8 sm:h-10 sm:w-10 rounded ml-2" />
      </WorkplaceShareButton>

      <WhatsappShareButton url={url}>
        <WhatsappIcon className="h-8 w-8 sm:h-10 sm:w-10 rounded ml-2" />
      </WhatsappShareButton>
    </div>
  );
};

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.mdx;
  const { previous, next } = pageContext;

  const disqusConfig = {
    url: `${data.site.siteMetadata.siteUrl + location.pathname}`,
    identifier: post.fields.slug,
    title: post.frontmatter.title,
  };

  return (
    <MDXProvider components={components}>
      <Layout location={location}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description}
          image={post.frontmatter.banner.childImageSharp.fixed.src}
        />

        <article>
          <header>
            <Img
              fluid={post.frontmatter.banner.childImageSharp.fluid}
              alt={`${post.frontmatter.title} Banner`}
              className="block mx-auto my-3 rounded-lg"
              style={{ maxWidth: 1200 }}
              imgStyle={{ maxWidth: 1200 }}
            />

            {post.frontmatter.photographer && post.frontmatter.unsplash_link ? (
              <div className="text-center mb-4">
                <span className="text-base sm:text-lg font-medium">
                  Photo by{" "}
                  <OutboundLink
                    href={post.frontmatter.unsplash_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {post.frontmatter.photographer}
                  </OutboundLink>{" "}
                  on{" "}
                  <OutboundLink
                    href="/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Unsplash
                  </OutboundLink>
                </span>
              </div>
            ) : null}

            <h1 className="text-4xl sm:text-6xl font-bold">
              {post.frontmatter.title}
            </h1>

            <div className="flex items-center justify-between text-lg sm:text-xl my-2">
              <p>{post.frontmatter.date}</p>

              <p>{`${post.timeToRead} min read`}</p>
            </div>

            {post.frontmatter.updated ? (
              <p className="text-lg sm:text-xl my-2">{`Last updated on ${post.frontmatter.updated}`}</p>
            ) : null}

            <ShareContainer url={location.href} />
          </header>

          <MDXRenderer>{post.body}</MDXRenderer>

          <hr />

          <footer>
            <ShareContainer url={location.href} />

            <h6 className="text:lg sm:text-xl font-medium my-5">
              <IfNotWebMonetized>
                Sign up for{" "}
                <OutboundLink
                  href="https://coil.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Coil
                </OutboundLink>{" "}
                to support this site.
              </IfNotWebMonetized>

              <IfWebMonetized>
                Thank you for supporting me with Web Monetization!
              </IfWebMonetized>

              <IfWebMonetizationPending>
                Web Monetization is pending!
              </IfWebMonetizationPending>
            </h6>

            <Bio />

            <div className="bg-white rounded-md p-2">
              <Disqus config={disqusConfig} />
            </div>
          </footer>
        </article>

        <nav className="my-8 w-full">
          <ul className="flex flex-wrap justify-between list-none p-0">
            <li className="text-xl sm:text-2xl font-medium flex-1 text-left">
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  <span className="flex flex-no-wrap items-center">
                    <FaArrowLeft className="mr-2" />
                    {previous.frontmatter.title}
                  </span>
                </Link>
              )}
            </li>

            <li className="text-xl sm:text-2xl font-medium flex-1 text-right">
              {next && (
                <Link to={next.fields.slug} rel="next">
                  <span className="flex flex-no-wrap items-center justify-end">
                    {next.frontmatter.title}
                    <FaArrowRight className="ml-2" />
                  </span>
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </Layout>
    </MDXProvider>
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
    mdx(fields: { slug: { eq: $slug } }) {
      body
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
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
            fixed(width: 1200, height: 630) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        updated(formatString: "MMMM Do, YYYY")
        photographer
        unsplash_link
      }
      timeToRead
    }
  }
`;
