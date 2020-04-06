import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link, useStaticQuery, graphql } from "gatsby";
import { rhythm } from "../utils/typography";
import { FaGithub, FaDev, FaLinkedin, FaTwitterSquare } from "react-icons/fa";
import { OutboundLink } from "gatsby-plugin-google-analytics";

const StyledFooter = styled.footer`
  margin-top: ${rhythm(3)};
`;

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query LayoutQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(30),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <header>
        <h1>
          <Link style={{ boxShadow: `none` }} to="/">
            {data.site.siteMetadata.title}
          </Link>
        </h1>

        <nav style={{ display: "flex", flexWrap: "wrap" }}>
          <div style={{ flex: 1, display: "flex" }}>
            <h2>
              <Link style={{ boxShadow: `none` }} to="/blog/">
                Blog
              </Link>
            </h2>

            <h2>
              <Link
                style={{ boxShadow: `none`, marginLeft: rhythm(0.25) }}
                to="/about/"
              >
                About
              </Link>
            </h2>
          </div>

          <div style={{ display: "flex" }}>
            <h2>
              <OutboundLink
                href="https://github.com/akhila-ariyachandra"
                target="_blank"
                rel="noopener noreferrer"
                style={{ boxShadow: `none` }}
                aria-label="GitHub"
              >
                <FaGithub />
              </OutboundLink>
            </h2>

            <h2 style={{ boxShadow: `none`, marginLeft: rhythm(0.25) }}>
              <OutboundLink
                href="https://dev.to/akhilaariyachandra"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="DEV"
              >
                <FaDev />
              </OutboundLink>
            </h2>

            <h2 style={{ boxShadow: `none`, marginLeft: rhythm(0.25) }}>
              <OutboundLink
                href="https://www.linkedin.com/in/akhila-ariyachandra/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </OutboundLink>
            </h2>

            <h2 style={{ boxShadow: `none`, marginLeft: rhythm(0.25) }}>
              <OutboundLink
                href="https://twitter.com/heshan_1010"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaTwitterSquare />
              </OutboundLink>
            </h2>
          </div>
        </nav>
      </header>

      <hr />

      <main>{children}</main>

      <StyledFooter>
        © {new Date().getFullYear()}, Built with
        {` `}
        <OutboundLink
          href="https://www.gatsbyjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Gatsby
        </OutboundLink>
      </StyledFooter>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
