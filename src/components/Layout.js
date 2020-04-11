import React from "react";
import PropTypes from "prop-types";
import Img from "gatsby-image";
import { Link, useStaticQuery, graphql } from "gatsby";
import { OutboundLink } from "gatsby-plugin-google-analytics";

const NAV_LINKS = [
  {
    name: "Blog",
    slug: "/blog/",
  },
  {
    name: "Career",
    slug: "/career/",
  },
  {
    name: "About",
    slug: "/about/",
  },
];

const Layout = ({ children, location }) => {
  const data = useStaticQuery(graphql`
    query LayoutQuery {
      site {
        siteMetadata {
          title
        }
      }
      logo: file(absolutePath: { regex: "/icon.png/" }) {
        childImageSharp {
          fluid(maxWidth: 50, maxHeight: 50) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex py-2 px-3 items-center shadow-md">
        <Link className="shadow-none" to="/">
          <Img
            fluid={data.logo.childImageSharp.fluid}
            alt="logo"
            style={{ width: 30 }}
            imgStyle={{ width: 30 }}
            className={`rounded transition duration-500 transform hover:text-white hover:antialiased hover:scale-110 hover:shadow-2xl ${
              location.pathname === "/" ? "scale-110" : ""
            }`}
          />
        </Link>

        <div className="flex-1" />

        <nav className="flex">
          {NAV_LINKS.map((link, index) => (
            <h2
              className={`text-2xl font-medium ${
                location.pathname === link.slug ? "text-green-600" : ""
              } transition duration-200 transform hover:text-green-600 ${
                index > 0 ? "ml-2" : ""
              }`}
              key={link.slug}
            >
              <Link className="shadow-none" to={link.slug}>
                {link.name}
              </Link>
            </h2>
          ))}
        </nav>
      </header>

      <main className="container p-8 max-w-screen-lg flex-1 flex flex-col items-center justify-center">
        {children}
      </main>

      <footer className="p-8 text-lg font-normal container max-w-screen-lg">
        © {new Date().getFullYear()}, Built with
        {` `}
        <OutboundLink
          className="underline transition duration-200 transform hover:text-green-600"
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
