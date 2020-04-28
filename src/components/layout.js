import React from "react";
import styled from "@emotion/styled";
import DarkToggle from "./DarkToggle";
import PropTypes from "prop-types";
import tw from "twin.macro";
import { Link, useStaticQuery, graphql } from "gatsby";
import { OutboundLink } from "gatsby-plugin-google-analytics";

const Wrapper = styled.div`
  max-width: 1000px;
  ${tw`mx-auto p-5 sm:p-8`}
`;

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
    <Wrapper>
      <header className="flex flex-row-reverse items-center">
        <DarkToggle />

        {location.pathname !== "/" ? (
          <h2 className="flex-1 text-xl sm:text-3xl font-medium	">
            <Link to={`/`}>{title}</Link>
          </h2>
        ) : null}
      </header>

      <main className="grid grid-cols-1 gap-24 sm:gap-32 py-10">
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
      </footer>
    </Wrapper>
  );
};

Layout.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Layout;
