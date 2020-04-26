import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import styled from "@emotion/styled";
import tw from "twin.macro";
import PostsContainer from "../components/PostsContainer";
import { Link, graphql } from "gatsby";
import {
  FaGithub,
  FaDev,
  FaLinkedin,
  FaTwitterSquare,
  FaRssSquare,
} from "react-icons/fa";
import { OutboundLink } from "gatsby-plugin-google-analytics";

const LINKS = [{ to: "/blog/", title: "Blog" }];

const StyledTitleContainer = styled.div`
  ${tw`my-20 sm:my-48 grid grid-cols-1 gap-2`}

  h1 {
    ${tw`text-4xl sm:text-6xl font-semibold my-1 py-0 leading-tight`}
  }

  p {
    ${tw`text-lg sm:text-2xl font-normal my-1 py-0`}
  }

  #site-nav {
    h3 {
      ${tw`text-2xl sm:text-4xl font-medium my-1 py-0`}
    }

    h3:not(:first-child) {
      ${tw`ml-2`}
    }
  }

  #social {
    ${tw`flex flex-row my-1 py-0`}

    .socialLink {
      ${tw`text-2xl sm:text-4xl`}
    }

    .socialLink:not(:first-child) {
      ${tw`ml-2`}
    }
  }
`;

const Index = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMdx.edges;

  return (
    <Layout location={location}>
      <SEO title="Akhila Ariyachandra" />

      <StyledTitleContainer>
        <h1>{siteTitle}</h1>

        <p>{data.site.siteMetadata.description}</p>

        <nav id="site-nav">
          {LINKS.map((link) => (
            <Link to={link.to}>
              <h3>{link.title}</h3>
            </Link>
          ))}
        </nav>

        <div id="social">
          <OutboundLink
            className="socialLink"
            href="https://github.com/akhila-ariyachandra"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </OutboundLink>

          <OutboundLink
            className="socialLink"
            href="https://dev.to/akhilaariyachandra"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="DEV"
          >
            <FaDev />
          </OutboundLink>

          <OutboundLink
            className="socialLink"
            href="https://www.linkedin.com/in/akhila-ariyachandra/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </OutboundLink>

          <OutboundLink
            className="socialLink"
            href="https://twitter.com/heshan_1010"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaTwitterSquare />
          </OutboundLink>

          <OutboundLink
            className="socialLink"
            href="/rss.xml"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="RSS Feed"
          >
            <FaRssSquare />
          </OutboundLink>
        </div>
      </StyledTitleContainer>

      <PostsContainer posts={posts} title="Latest Posts" />
    </Layout>
  );
};

export default Index;

export const pageQuery = graphql`
  query Index {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }, limit: 3) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM Do, YYYY")
            title
            description
          }
          timeToRead
        }
      }
    }
  }
`;
