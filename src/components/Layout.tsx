import Header from "src/components/Header";
import type { FunctionComponent } from "react";
import { FaGithub } from "react-icons/fa";

const Layout: FunctionComponent = ({ children }) => {
  return (
    <main className="wrapper mx-auto min-h-screen place-content-between">
      <Header />

      {children}

      <footer className="p-4 mt-5 flex justify-between items-center space-x-4">
        <span className="font-normal text-base sm:text-xl">
          © {new Date().getFullYear()}, Built with
          {` `}
          <a
            className="font-medium"
            href="https://nextjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Next.js
          </a>
          {", "}
          <a
            className="font-medium"
            href="https://tailwindcss.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tailwind CSS
          </a>
          {", & "}
          <a
            className="font-medium"
            href="https://vercel.com/home"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vercel
          </a>
        </span>

        <a
          href="https://github.com/akhila-ariyachandra/akhilaariyachandra.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl sm:text-2xl"
        >
          <FaGithub />
        </a>
      </footer>
    </main>
  );
};

export default Layout;
