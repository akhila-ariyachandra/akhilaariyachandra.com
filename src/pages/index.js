import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import styled from "@emotion/styled";
import BlogPost from "../components/BlogPost";
import tw from "twin.macro";
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
  margin: 10rem 0;

  h1 {
    font-family: "Inter", sans-serif;
    font-weight: 600;
    font-size: 2rem;

    @media (min-width: 640px) {
      font-size: 4rem;
    }
  }

  p {
    font-family: "Roboto", sans-serif;
    font-size: 1.1rem;

    @media (min-width: 640px) {
      font-size: 1.5rem;
    }
  }

  #site-nav {
    h3 {
      font-size: 1.65rem;
      font-family: "Inter", sans-serif;

      @media (min-width: 640px) {
        font-size: 2.5em;
      }
    }

    h3:not(:first-child) {
      margin-left: 0.3em;
    }
  }

  #social {
    ${tw`grid grid-cols-5 gap-1`}

    .socialLink {
      ${tw`text-xl sm:text-4xl`}
    }
  }
`;

const PostContainer = styled.div`
  h2 {
    font-family: "Inter", sans-serif;
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

      <PostContainer>
        <h2>Latest Posts</h2>

        {posts.map(({ node }) => (
          <BlogPost key={node.id} node={node} />
        ))}
      </PostContainer>
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
