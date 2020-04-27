import React from "react";
import styled from "@emotion/styled";
import tw from "twin.macro";
import DarkToggle from "./DarkToggle";
import { Global, css } from "@emotion/core";
import { Link } from "gatsby";

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 1000px;
  padding: 2rem;
`;

const StyledFooter = styled.footer`
  font-family: "Inter", sans-serif;
`;

const Layout = ({ location, title, children }) => {
  return (
    <Wrapper>
      <header className="flex flex-row-reverse items-center">
        <DarkToggle />

        {title ? (
          <h2 className="flex-1">
            <Link to={`/`}>{title}</Link>
          </h2>
        ) : null}
      </header>

      <main className="grid grid-cols-1 gap-4">{children}</main>

      <StyledFooter>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </StyledFooter>
    </Wrapper>
  );
};

export default Layout;
