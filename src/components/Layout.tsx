import React from "react";
import BackgroundImage from "gatsby-background-image";
import { useStaticQuery, graphql } from "gatsby";
import { MdMenu } from "react-icons/md";

const initialState = {
  showNavBar: false,
};

const reducer = (state, action) => {

}

type Props = {
  maxWidth?: boolean;
};

const Layout: React.FunctionComponent<Props> = ({ children, maxWidth }) => {
  const { background } = useStaticQuery(graphql`
    query LayoutQuery {
      background: file(relativePath: { eq: "background.png" }) {
        childImageSharp {
          fluid(quality: 90, maxWidth: 1920) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `);

  const imageData = background.childImageSharp.fluid;

  return (
    <BackgroundImage
      className="min-h-screen flex flex-col bg-fixed text-white antialiased"
      fluid={imageData}
    >
      <button className="inline-flex items-center p-1 text-4xl border-white border rounded m-3 fixed top-0 left-0 z-10">
        <MdMenu />
      </button>

      {maxWidth ? (
        <main>{children}</main>
      ) : (
        <main className="container p-8 max-w-screen-lg flex-1 flex flex-col items-center justify-center">
          {children}
        </main>
      )}
    </BackgroundImage>
  );
};

Layout.defaultProps = {
  maxWidth: false,
};

export default Layout;
