import splitbee from "src/lib/splitbee";
import Header from "src/components/Header";
import Link from "next/link";
import type { FunctionComponent } from "react";
import { FaGithub } from "react-icons/fa";

const LINKS = [
  { href: "/blog", title: "Blog" },
  { href: "/career", title: "Career" },
  { href: "/about", title: "About" },
  { href: "/snippets", title: "Snippets" },
  { href: "/dashboard", title: "Dashboard" },
];

const Layout: FunctionComponent = ({ children }) => {
  return (
    <main className="wrapper place-content-between mx-auto min-h-screen">
      <Header />

      {children}

      <footer className="flex flex-col mt-10 p-4 space-y-4">
        <nav className="grid gap-2 grid-cols-2 sm:grid-cols-3">
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
            >
              Next.js
            </a>
            {", "}
            <a
              className="dark:text-green-600 text-green-700 font-medium"
              href="https://tailwindcss.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tailwind CSS
            </a>
            {", & "}
            <a
              className="dark:text-green-600 text-green-700 font-medium"
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
            className="dark:text-green-600 text-green-700 text-xl"
            onClick={() => {
              splitbee.track("Open Link", { name: "GitHub Repo" });
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
