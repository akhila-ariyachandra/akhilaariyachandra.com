import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import styled from "@emotion/styled";
import tw from "twin.macro";
import ListContainer from "../components/ListContainer";
import BlogPost from "../components/BlogPost";
import ProjectLink from "../components/ProjectLink";
import { Link, useStaticQuery, graphql } from "gatsby";
import {
  FaGithub,
  FaDev,
  FaLinkedin,
  FaTwitterSquare,
  FaRssSquare,
} from "react-icons/fa";
import { OutboundLink } from "gatsby-plugin-google-analytics";

const LINKS = [
  { to: "/blog/", title: "Blog" },
  { to: "/career/", title: "Career" },
  { to: "/about/", title: "About" },
];

const StyledTitleContainer = styled.div`
  ${tw`my-20 sm:my-48 grid grid-cols-1 gap-2`}

  h1 {
    ${tw`text-4xl sm:text-6xl font-semibold my-1 py-0 leading-tight`}
  }

  p {
    ${tw`text-lg sm:text-2xl font-normal my-1 py-0`}
  }

  #social {
    ${tw`flex flex-row my-1 py-0`}

    .socialLink {
      ${tw`text-2xl sm:text-4xl`}
    }

    .socialLink:not(:first-of-type) {
      ${tw`ml-2`}
    }
  }
`;

const Index = ({ data, location }) => {
  const { site, allMdx } = useStaticQuery(graphql`
    query IndexPageQuery {
      site {
        siteMetadata {
          title
          description
          social {
            github
            dev
            linkedin
            twitter
          }
          projects {
            title
            url
            description
          }
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
  `);

  const siteTitle = site.siteMetadata.title;
  const posts = allMdx.edges;
  const projects = site.siteMetadata.projects;
  const social = site.siteMetadata.social;

  const SocialLink = ({ site, link }) => {
    let Icon = null;

    switch (site) {
      case "GitHub":
        Icon = FaGithub;
        break;
      case "DEV":
        Icon = FaDev;
        break;
      case "LinkedIn":
        Icon = FaLinkedin;
        break;
      case "Twitter":
        Icon = FaTwitterSquare;
        break;
      case "RSS":
        Icon = FaRssSquare;
        break;
      default:
        Icon = null;
    }

    return (
      <OutboundLink
        className="socialLink"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={site}
      >
        <Icon />
      </OutboundLink>
    );
  };

  return (
    <Layout location={location}>
      <SEO title="Akhila Ariyachandra" />

      <StyledTitleContainer>
        <h1>{siteTitle}</h1>

        <p>{data.site.siteMetadata.description}</p>

        <nav id="site-nav" className="flex">
          {LINKS.map((link, index) => (
            <Link to={link.to}>
              <h3
                className={`text-2xl sm:text-4xl font-medium my-1 py-0 ${
                  index !== 0 ? "ml-3" : ""
                }`}
              >
                {link.title}
              </h3>
            </Link>
          ))}
        </nav>

        <div id="social">
          <SocialLink site="GitHub" link={social.github} />

          <SocialLink site="DEV" link={social.dev} />

          <SocialLink site="LinkedIn" link={social.linkedin} />

          <SocialLink site="Twitter" link={social.twitter} />

          <SocialLink site="RSS" link="/rss.xml" />
        </div>
      </StyledTitleContainer>

      <ListContainer title="Latest Posts">
        {posts.map(({ node }) => (
          <BlogPost key={node.id} node={node} />
        ))}
      </ListContainer>

      <ListContainer title="Projects">
        {projects.map((project) => (
          <ProjectLink project={project} key={project.url} />
        ))}
      </ListContainer>
    </Layout>
  );
};

export default Index;
