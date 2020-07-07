import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
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
              updated(formatString: "MMMM Do, YYYY")
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
        className="text-3xl sm:text-4xl"
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

      <div className="my-20 sm:my-48 space-y-3">
        <h1 className="text-5xl sm:text-6xl font-semibold py-0 leading-tight">
          {siteTitle}
        </h1>

        <p className="text-xl sm:text-2xl font-normal py-0">
          {site.siteMetadata.description}
        </p>

        <nav className="flex flex-row space-x-3">
          {LINKS.map((link) => (
            <Link
              to={link.to}
              className="text-3xl sm:text-4xl font-medium my-1 py-0"
            >
              {link.title}
            </Link>
          ))}
        </nav>

        <div className="flex flex-row my-1 py-0 space-x-2">
          <SocialLink site="GitHub" link={social.github} />

          <SocialLink site="DEV" link={social.dev} />

          <SocialLink site="LinkedIn" link={social.linkedin} />

          <SocialLink site="Twitter" link={social.twitter} />

          <SocialLink site="RSS" link="/rss.xml" />
        </div>
      </div>

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
