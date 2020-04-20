import React from "react";
import Bio from "../components/Bio";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Img from "gatsby-image";
import AdSense from "react-adsense";
import { Link, graphql } from "gatsby";
import { Disqus } from "gatsby-plugin-disqus";
import { OutboundLink } from "gatsby-plugin-google-analytics";
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

const ShareContainer = ({ url }) => {
  return (
    <div className="my-2">
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
  const post = data.markdownRemark;
  const { previous, next } = pageContext;

  let disqusConfig = {
    url: `${data.site.siteMetadata.siteUrl + location.pathname}`,
    identifier: post.fields.slug,
    title: post.frontmatter.title,
  };

  return (
    <Layout location={location}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        image={post.frontmatter.banner.childImageSharp.fixed.src}
      />

      <article
        className="max-w-full p-3 rounded-md mt-10"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <header>
          <h1 className="text-2xl sm:text-5xl font-bold">
            {post.frontmatter.title}
          </h1>

          <div className="flex items-center">
            <p className="flex-1 text-lg">{`${post.frontmatter.date}`}</p>

            <p className="text-lg">{`${post.timeToRead} min read`}</p>
          </div>

          <ShareContainer url={location.href} />

          <Img
            fluid={post.frontmatter.banner.childImageSharp.fluid}
            alt={`${post.frontmatter.title} Banner`}
            className="block mx-auto my-3 rounded-lg"
            style={{ maxWidth: 1200 }}
            imgStyle={{ maxWidth: 1200 }}
          />
        </header>

        <AdSense.Google
          client={process.env.GOOGLE_AD_CLIENT}
          slot={process.env.GOOGLE_AD_SLOT}
          style={{ display: "block" }}
          format="auto"
          responsive="true"
          className="my-3"
        />

        <section dangerouslySetInnerHTML={{ __html: post.html }} />

        <hr className="my-3" />

        <AdSense.Google
          client={process.env.GOOGLE_AD_CLIENT}
          slot={process.env.GOOGLE_AD_SLOT}
          style={{ display: "block" }}
          format="auto"
          responsive="true"
        />

        <footer>
          <hr className="my-3" />

          <ShareContainer url={location.href} />

          <hr className="my-3" />

          <h6 className="text-xl font-medium">
            Enjoyed the post or found it useful?{" "}
            <OutboundLink
              href={data.site.siteMetadata.donationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-green-500"
            >
              Please consider buying me a coffee.
            </OutboundLink>
          </h6>

          <hr className="my-3" />

          <Bio />

          <hr className="my-3" />

          <div className="bg-white rounded-md p-2">
            <Disqus config={disqusConfig} />
          </div>

          <hr className="my-3" />

          <AdSense.Google
            client={process.env.GOOGLE_AD_CLIENT}
            slot={process.env.GOOGLE_AD_SLOT}
            style={{ display: "block" }}
            format="auto"
            responsive="true"
          />

          <hr className="my-3" />
        </footer>
      </article>

      <nav className="my-8 w-full">
        <ul className="flex flex-wrap justify-between list-none p-0">
          <li className="text-2xl font-medium flex-1 text-left">
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                <span className="flex flex-no-wrap items-center">
                  <FaArrowLeft className="mr-2" />
                  {previous.frontmatter.title}
                </span>
              </Link>
            )}
          </li>

          <li className="text-2xl font-medium flex-1 text-right">
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

      {/* Script for react-adsense*/}
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      />
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
