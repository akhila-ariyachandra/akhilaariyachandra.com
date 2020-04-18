import React from "react";
import BackgroundImage from "gatsby-background-image";
import { useStaticQuery, graphql, Link } from "gatsby";
import { MdMenu, MdClose, MdHome, MdNote } from "react-icons/md";
import {
  FaGithub,
  FaDev,
  FaLinkedin,
  FaTwitterSquare,
  FaRssSquare,
} from "react-icons/fa";
import { OutboundLink } from "gatsby-plugin-google-analytics";

const initialState = {
  showNavBar: false,
  navBarWidth: 0,
  opacity: 0,
  zIndex: -30,

  navBgOpacity: 0,
  navBgZIndex: -20,
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
      zIndex = -30;

      navBgOpacity = 0;
      navBgZIndex = -20;
      break;
    case "open":
      showNavBar = true;
      navBarWidth = 250;
      opacity = 1;
      zIndex = 30;

      navBgOpacity = 0.5;
      navBgZIndex = 20;
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
        className="inline-flex items-center p-1 text-4xl m-3 fixed top-0 left-0 z-10"
        onClick={() => dispatch({ type: "open" })}
      >
        <MdMenu />
      </button>

      {/* Sidebar */}
      <nav
        className="fixed top-0 left-0 h-screen bg-white transform transition duration-200 ease-in bg-gray-900 p-3"
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

        {/* Site Navigation */}
        <div
          className="grid grid-cols-1 gap-2 mt-10  transition duration-75"
          style={{ opacity: state.opacity }}
        >
          <div className="text-3xl">
            <Link to="/">
              <div className="flex items-center">
                <MdHome className="text-2xl" />

                <p className="flex-1 mx-2 text-3xl">Home</p>
              </div>
            </Link>
          </div>

          <div>
            <Link to="/blog/">
              <div className="flex items-center">
                <MdNote className="text-2xl" />

                <p className="flex-1 mx-2 text-3xl">Blog</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Socials */}
        <nav className="absolute inset-x-0 bottom-0 grid grid-cols-5 p-3">
          <div className="flex">
            <div className="flex-1" />
            <OutboundLink
              className="shadow-none text-3xl font-medium"
              href="https://github.com/akhila-ariyachandra"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub
                className="transition duration-75"
                style={{ opacity: state.opacity }}
              />
            </OutboundLink>
            <div className="flex-1" />
          </div>

          <div className="flex">
            <div className="flex-1" />
            <OutboundLink
              className="shadow-none text-3xl font-medium"
              href="https://dev.to/akhilaariyachandra"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="DEV"
            >
              <FaDev
                className="transition duration-75"
                style={{ opacity: state.opacity }}
              />
            </OutboundLink>
            <div className="flex-1" />
          </div>

          <div className="flex">
            <div className="flex-1" />
            <OutboundLink
              className="shadow-none text-3xl font-medium"
              href="https://www.linkedin.com/in/akhila-ariyachandra/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin
                className="transition duration-75"
                style={{ opacity: state.opacity }}
              />
            </OutboundLink>
            <div className="flex-1" />
          </div>

          <div className="flex">
            <div className="flex-1" />
            <OutboundLink
              className="shadow-none text-3xl font-medium"
              href="https://twitter.com/heshan_1010"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaTwitterSquare
                className="transition duration-75"
                style={{ opacity: state.opacity }}
              />
            </OutboundLink>
            <div className="flex-1" />
          </div>

          <div className="flex">
            <div className="flex-1" />
            <OutboundLink
              className="shadow-none text-3xl font-medium"
              href="/rss.xml"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="RSS Feed"
            >
              <FaRssSquare
                className="transition duration-75"
                style={{ opacity: state.opacity }}
              />
            </OutboundLink>
            <div className="flex-1" />
          </div>
        </nav>
      </nav>

      {/* Background when sidebar is opened */}
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
