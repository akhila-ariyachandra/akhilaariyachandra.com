import React from "react";
import PropTypes from "prop-types";
import { Link, useStaticQuery, graphql } from "gatsby";
import {
  FaGithub,
  FaDev,
  FaLinkedin,
  FaTwitterSquare,
  FaRssSquare,
} from "react-icons/fa";
import { OutboundLink } from "gatsby-plugin-google-analytics";

const ACTIVE_PAGE_COLOR = "text-green-600";

const Layout = ({ children, location }) => {
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
    <div className="container p-8 max-w-screen-lg">
      <header>
        <h1
          className={`text-4xl font-bold ${
            location.pathname === "/" ? ACTIVE_PAGE_COLOR : ""
          }`}
        >
          <Link className="shadow-none" to="/">
            {data.site.siteMetadata.title}
          </Link>
        </h1>

        <nav className="flex flex-wrap mt-2 items-center">
          <div className="flex">
            <h2
              className={`text-2xl font-medium ${
                location.pathname === "/blog/" ? ACTIVE_PAGE_COLOR : ""
              }`}
            >
              <Link className="shadow-none" to="/blog/">
                Blog
              </Link>
            </h2>

            <h2
              className={`text-2xl font-medium ml-2 ${
                location.pathname === "/about/" ? ACTIVE_PAGE_COLOR : ""
              }`}
            >
              <Link className="shadow-none" to="/about/">
                About
              </Link>
            </h2>
          </div>

          <div className="flex-1 flex justify-end">
            <h2 className="text-2xl font-medium ml-2">
              <OutboundLink
                className="shadow-none"
                href="https://github.com/akhila-ariyachandra"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithub />
              </OutboundLink>
            </h2>

            <h2 className="text-2xl font-medium ml-2">
              <OutboundLink
                className="shadow-none"
                href="https://dev.to/akhilaariyachandra"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="DEV"
              >
                <FaDev />
              </OutboundLink>
            </h2>

            <h2 className="text-2xl font-medium ml-2">
              <OutboundLink
                className="shadow-none"
                href="https://www.linkedin.com/in/akhila-ariyachandra/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </OutboundLink>
            </h2>

            <h2 className="text-2xl font-medium ml-2">
              <OutboundLink
                className="shadow-none"
                href="https://twitter.com/heshan_1010"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaTwitterSquare />
              </OutboundLink>
            </h2>

            <h2 className="text-2xl font-medium ml-2">
              <OutboundLink
                className="shadow-none"
                href="/rss.xml"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="RSS Feed"
              >
                <FaRssSquare />
              </OutboundLink>
            </h2>
          </div>
        </nav>
      </header>

      <hr className="my-3" />

      <main>{children}</main>

      <footer className="mt-4 text-lg font-normal">
        © {new Date().getFullYear()}, Built with
        {` `}
        <OutboundLink
          className="underline"
          href="https://www.gatsbyjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Gatsby
        </OutboundLink>
      </footer>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
};

export default Layout;
