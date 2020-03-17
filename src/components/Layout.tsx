import React from "react";
import Link from "next/link";

const SOCIAL_LINKS = [
  {
    title: "GitHub",
    url: "https://github.com/akhila-ariyachandra",
  },
  {
    title: "DEV",
    url: "https://dev.to/akhilaariyachandra",
  },
  {
    title: "LinkedIn",
    url: "https://www.linkedin.com/in/akhila-ariyachandra/",
  },
];

const openNewTabLink = url => {
  window.open(url, "_blank", "noopener=yes,noreferrer=yes");
};

type Props = {
  children: React.ReactNode;
};

const Layout: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <div id="layout">
      <header>
        <Link href="/">
          <h1 className="navigation link">Akhila Ariyachandra</h1>
        </Link>

        <nav id="navigation-bar">
          <div id="site-navigation">
            <Link href="/blog">
              <h1 className="navigation link">Blog</h1>
            </Link>

            <Link href="/about">
              <h1 className="navigation shift-right link">About</h1>
            </Link>
          </div>

          <div id="social-links">
            {SOCIAL_LINKS.map(link => (
              <h1
                onClick={() => openNewTabLink(link.url)}
                className="shift-right navigation link"
              >
                {link.title}
              </h1>
            ))}
          </div>
        </nav>
      </header>

      <hr />

      {children}

      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <span
          onClick={() => openNewTabLink("https://nextjs.org/")}
          className="navigation link"
        >
          Next.js
        </span>
        {`, `}
        <span
          onClick={() => openNewTabLink("https://www.contentful.com/")}
          className="navigation link"
        >
          Contentful
        </span>
        {`, & `}
        <span
          onClick={() => openNewTabLink("https://zeit.co/")}
          className="navigation link"
        >
          ZEIT
        </span>
      </footer>

      <style jsx>{`
        #layout {
          max-width: 1000px;
          margin: auto;
          padding: 1.5rem;
        }

        #navigation-bar,
        #site-navigation,
        #social-links {
          display: flex;
        }

        #navigation-bar {
          flex-wrap: wrap;
        }

        #site-navigation {
          flex: 1;
        }

        .shift-right {
          margin-left: 0.5rem;
        }

        .navigation {
          cursor: pointer;
        }

        footer {
          margin-top: 5rem;
        }
      `}</style>
    </div>
  );
};

export default Layout;
