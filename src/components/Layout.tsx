import splitbee from "@/lib/splitbee";
import Header from "@/components/Header";
import Link from "next/link";
import NowPlaying from "@/components/NowPlaying";
import type { FunctionComponent } from "react";
import { FaGithub } from "react-icons/fa";

const LINKS = [
  { href: "/blog", title: "Blog" },
  { href: "/career", title: "Career" },
  { href: "/about", title: "About" },
  { href: "/snippets", title: "Snippets" },
  { href: "/dashboard", title: "Dashboard" },
  { href: "/guestbook", title: "Guestbook" },
];

const Layout: FunctionComponent = ({ children }) => {
  return (
    <main className="wrapper place-content-between mx-auto min-h-full">
      <Header />

      {children}

      <footer className="flex flex-col mt-10 p-4 space-y-6">
        <hr className="border-1 w-full border-gray-200 dark:border-gray-600" />

        <NowPlaying />

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
          <span className="dark:text-gray-200 text-gray-800 text-base font-medium">
            © {new Date().getFullYear()}, Built with
            {` `}
            <a
              className="dark:text-green-600 text-green-700 font-semibold"
              href="https://nextjs.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Next.js
            </a>
            {", "}
            <a
              className="dark:text-green-600 text-green-700 font-semibold"
              href="https://tailwindcss.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tailwind CSS
            </a>
            {", & "}
            <a
              className="dark:text-green-600 text-green-700 font-semibold"
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
