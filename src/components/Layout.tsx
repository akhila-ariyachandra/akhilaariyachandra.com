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
          <h1 id="site-title">Akhila Ariyachandra</h1>
        </Link>
      </header>

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

        #site-title {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Layout;
