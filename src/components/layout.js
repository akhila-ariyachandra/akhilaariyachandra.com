import React from "react";
import DarkToggle from "./DarkToggle";
import PropTypes from "prop-types";
import { Link, useStaticQuery, graphql } from "gatsby";
import { OutboundLink } from "gatsby-plugin-google-analytics";

const Layout = ({ location, children }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  );

  const title = site.siteMetadata.title;

  return (
    <div className="max-w-screen-lg mx-auto p-5 sm:p-8">
      <header className="flex flex-row-reverse items-center justify-between">
        <DarkToggle />

        {location.pathname !== "/" ? (
          <h2 className="text-xl sm:text-2xl font-medium leading-5 sm:leading-6">
            <Link to={`/`}>{title}</Link>
          </h2>
        ) : null}
      </header>

      <main className="grid grid-cols-1 gap-24 sm:gap-32 py-5 sm:py-8">
        {children}
      </main>

      <footer className="font-normal text-base sm:text-xl">
        © {new Date().getFullYear()}, Built with
        {` `}
        <OutboundLink
          className="font-medium"
          href="https://www.gatsbyjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Gatsby
        </OutboundLink>
        {", "}
        <OutboundLink
          className="font-medium"
          href="https://tailwindcss.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tailwind CSS
        </OutboundLink>
        {", & "}
        <OutboundLink
          className="font-medium"
          href="https://vercel.com/home"
          target="_blank"
          rel="noopener noreferrer"
        >
          Vercel
        </OutboundLink>
      </footer>
    </div>
  );
};

Layout.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Layout;
