import React from "react";
import PropTypes from "prop-types";
import { Link, useStaticQuery, graphql } from "gatsby";
import { rhythm } from "../utils/typography";

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
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <header>
        <h1>
          <Link style={{ boxShadow: `none` }} to="/">
            {data.site.siteMetadata.title}
          </Link>
        </h1>

        <nav style={{ display: "flex" }}>
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
        </nav>
      </header>

      <hr />

      <main>{children}</main>

      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
