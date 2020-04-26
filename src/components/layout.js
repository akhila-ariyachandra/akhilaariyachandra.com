import React from "react";
import styled from "@emotion/styled";
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
      <Global
        styles={css`
          a {
            color: #0074d9;
            text-decoration: none;
          }
        `}
      />

      {title ? (
        <header>
          <h2
            style={{
              fontFamily: `Inter, sans-serif`,
              marginTop: 0,
            }}
          >
            <Link
              style={{
                boxShadow: `none`,
                color: `inherit`,
              }}
              to={`/`}
            >
              {title}
            </Link>
          </h2>
        </header>
      ) : null}

      <main>{children}</main>

      <StyledFooter>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </StyledFooter>
    </Wrapper>
  );
};

export default Layout;
