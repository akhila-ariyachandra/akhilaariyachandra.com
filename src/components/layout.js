import React from "react";
import styled from "@emotion/styled";
import DarkToggle from "./DarkToggle";
import PropTypes from "prop-types";
import { Link, useStaticQuery, graphql } from "gatsby";

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 1000px;
  padding: 2rem;
`;

const StyledFooter = styled.footer`
  font-family: "Inter", sans-serif;
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
          <h2 className="flex-1">
            <Link to={`/`}>{title}</Link>
          </h2>
        ) : null}
      </header>

      <main className="grid grid-cols-1 gap-4 py-10">{children}</main>

      <StyledFooter>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </StyledFooter>
    </Wrapper>
  );
};

Layout.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Layout;
