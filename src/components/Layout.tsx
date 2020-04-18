import React from "react";
import BackgroundImage from "gatsby-background-image";
import { useStaticQuery, graphql } from "gatsby";
import { MdMenu, MdClose } from "react-icons/md";

const initialState = {
  showNavBar: false,
  navBarWidth: 0,
  opacity: 0,
  zIndex: -2,

  navBgOpacity: 0,
  navBgZIndex: -1,
};

const reducer = (state, action) => {
  let {
    showNavBar,
    navBarWidth,
    opacity,
    zIndex,
    navBgOpacity,
    navBgZIndex,
  } = state;

  switch (action.type) {
    case "close":
      showNavBar = false;
      navBarWidth = 0;
      opacity = 0;
      zIndex = -2;

      navBgOpacity = 0;
      navBgZIndex = -1;
      break;
    case "open":
      showNavBar = true;
      navBarWidth = 250;
      opacity = 1;
      zIndex = 2;

      navBgOpacity = 0.5;
      navBgZIndex = 1;
      break;
  }

  return {
    showNavBar,
    navBarWidth,
    opacity,
    zIndex,
    navBgOpacity,
    navBgZIndex,
  };
};

type Props = {
  maxWidth?: boolean;
};

const Layout: React.FunctionComponent<Props> = ({ children, maxWidth }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

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
      <button
        className="inline-flex items-center p-1 text-4xl border-white border rounded m-3 fixed top-0 left-0"
        onClick={() => dispatch({ type: "open" })}
      >
        <MdMenu />
      </button>

      <nav
        className="fixed top-0 left-0 h-screen bg-white transition duration-200 bg-gray-900 p-3"
        style={{
          width: state.navBarWidth,
          opacity: state.opacity,
          zIndex: state.zIndex,
        }}
      >
        <button
          className="inline-flex items-center p-1 text-4xl m-3 absolute top-0 right-0 transition duration-75"
          style={{ opacity: state.opacity }}
          onClick={() => dispatch({ type: "close" })}
        >
          <MdClose />
        </button>

        <ul
          className="list-none list-inside mt-10 transition duration-75"
          style={{ opacity: state.opacity }}
        >
          <li>Home</li>
          <li>Blog</li>
        </ul>
      </nav>

      <div
        id="nav-bg"
        className="fixed inset-0 bg-black transition duration-200"
        style={{ zIndex: state.navBgZIndex, opacity: state.navBgOpacity }}
        onClick={() => dispatch({ type: "close" })}
      />

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
