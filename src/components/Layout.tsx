import React from "react";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <div id="layout">
      <header>
        <Link href="/">
          <h1 className="navigation">Akhila Ariyachandra</h1>
        </Link>

        <nav id="navigation-bar">
          <div id="site-navigation">
            <Link href="/blog">
              <h1 className="navigation">Blog</h1>
            </Link>

            <Link href="/about">
              <h1 className="navigation shift-right">About</h1>
            </Link>
          </div>

          <div>
            <a
              href="https://github.com/akhila-ariyachandra"
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub
            </a>

            <a
              href="https://dev.to/akhilaariyachandra"
              rel="noopener noreferrer"
              target="_blank"
              className="shift-right"
            >
              DEV
            </a>

            <a
              href="https://www.linkedin.com/in/akhila-ariyachandra/"
              rel="noopener noreferrer"
              target="_blank"
              className="shift-right"
            >
              LinkedIn
            </a>
          </div>
        </nav>
      </header>

      <hr />

      {children}

      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://nextjs.org/" rel="noopener noreferrer" target="_blank">
          Next.js
        </a>
        {`, `}
        <a
          href="https://www.contentful.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Contentful
        </a>
        {`, & `}
        <a href="https://zeit.co/" rel="noopener noreferrer" target="_blank">
          ZEIT
        </a>
      </footer>

      <style jsx>{`
        #layout {
          max-width: 1000px;
          margin: auto;
          padding: 1.5rem;
        }

        #navigation-bar,
        #site-navigation {
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
      `}</style>
    </div>
  );
};

export default Layout;
