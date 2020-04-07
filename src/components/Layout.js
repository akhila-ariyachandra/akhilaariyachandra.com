import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import StyledOutboundLink from "./StyledOutboundLink";
import { Link, useStaticQuery, graphql } from "gatsby";
import { rhythm } from "../utils/typography";
import {
  FaGithub,
  FaDev,
  FaLinkedin,
  FaTwitterSquare,
  FaRssSquare,
} from "react-icons/fa";
import { OutboundLink } from "gatsby-plugin-google-analytics";

const StyledFooter = styled.footer`
  margin-top: ${rhythm(3)};
`;

const StyledH2 = styled.h2`
  ${({ marginLeft }) => (marginLeft ? `margin-left: ${rhythm(0.25)};` : "")}
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
          <div style={{ display: "flex" }}>
            <StyledH2>
              <Link style={{ boxShadow: `none` }} to="/blog/">
                Blog
              </Link>
            </StyledH2>

            <StyledH2 marginLeft>
              <Link style={{ boxShadow: `none` }} to="/about/">
                About
              </Link>
            </StyledH2>
          </div>

          <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <StyledH2 marginLeft>
              <StyledOutboundLink
                href="https://github.com/akhila-ariyachandra"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithub />
              </StyledOutboundLink>
            </StyledH2>

            <StyledH2 marginLeft>
              <StyledOutboundLink
                href="https://dev.to/akhilaariyachandra"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="DEV"
              >
                <FaDev />
              </StyledOutboundLink>
            </StyledH2>

            <StyledH2 marginLeft>
              <StyledOutboundLink
                href="https://www.linkedin.com/in/akhila-ariyachandra/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </StyledOutboundLink>
            </StyledH2>

            <StyledH2 marginLeft>
              <StyledOutboundLink
                href="https://twitter.com/heshan_1010"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaTwitterSquare />
              </StyledOutboundLink>
            </StyledH2>

            <StyledH2 marginLeft>
              <StyledOutboundLink
                href="/rss.xml"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="RSS Feed"
              >
                <FaRssSquare />
              </StyledOutboundLink>
            </StyledH2>
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
