import Header from "src/components/Header";
import { FunctionComponent } from "react";

const Layout: FunctionComponent = ({ children }) => {
  return (
    <main className="wrapper mx-auto min-h-screen place-content-between">
      <Header />

      {children}

      <footer className="font-normal text-base sm:text-xl p-4 mt-5">
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
      </footer>
    </main>
  );
};

export default Layout;
