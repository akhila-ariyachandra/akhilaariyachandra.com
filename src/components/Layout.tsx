import Header from "src/components/Header";
import Link from "next/link";
import type { FunctionComponent } from "react";
import { trackEvent } from "src/lib/splitbee";
import { FaGithub } from "react-icons/fa";

const LINKS = [
  { href: "/blog", title: "Blog" },
  { href: "/career", title: "Career" },
  { href: "/about", title: "About" },
  { href: "/snippets", title: "Snippets" },
];

const Layout: FunctionComponent = ({ children }) => {
  return (
    <main className="wrapper place-content-between mx-auto min-h-screen">
      <Header />

      {children}

      <footer className="flex flex-col mt-10 p-4 space-y-4">
        <nav className="flex space-x-4">
          {LINKS.map((link) => (
            <Link href={link.href} key={link.href}>
              <a className="dark:text-green-600 text-green-700 text-xl font-medium">
                {link.title}
              </a>
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-between">
          <span className="text-black dark:text-white text-base font-normal">
            © {new Date().getFullYear()}, Built with
            {` `}
            <a
              className="dark:text-green-600 text-green-700 font-medium"
              href="https://nextjs.org/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackEvent("Open Link", { name: "Next.js" });
              }}
            >
              Next.js
            </a>
            {", "}
            <a
              className="dark:text-green-600 text-green-700 font-medium"
              href="https://tailwindcss.com/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackEvent("Open Link", { name: "Tailwind.css" });
              }}
            >
              Tailwind CSS
            </a>
            {", & "}
            <a
              className="dark:text-green-600 text-green-700 font-medium"
              href="https://vercel.com/home"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackEvent("Open Link", { name: "Vercel" });
              }}
            >
              Vercel
            </a>
          </span>

          <a
            href="https://github.com/akhila-ariyachandra/akhilaariyachandra.com"
            target="_blank"
            rel="noopener noreferrer"
            className="dark:text-green-600 text-green-700 text-xl"
            onClick={() => {
              trackEvent("Open Link", { name: "GitHub Repo" });
            }}
          >
            <FaGithub />
          </a>
        </div>
      </footer>
    </main>
  );
};

export default Layout;
