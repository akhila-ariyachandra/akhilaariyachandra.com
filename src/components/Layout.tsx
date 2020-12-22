import Header from "src/components/Header";
import Link from "next/link";
import type { FunctionComponent } from "react";
import { trackEvent } from "src/lib/splitbee";
import { useRouter } from "next/router";
import { FaGithub } from "react-icons/fa";

const LINKS = [
  { href: "/blog", title: "Blog" },
  { href: "/career", title: "Career" },
  { href: "/about", title: "About" },
  { href: "/snippets", title: "Snippets" },
];

const Layout: FunctionComponent = ({ children }) => {
  const router = useRouter();

  return (
    <main className="wrapper mx-auto min-h-screen place-content-between">
      <Header />

      {children}

      <footer className="p-4 mt-10 flex flex-col space-y-4">
        {router.asPath !== "/" ? (
          <nav className="flex space-x-4">
            {LINKS.map((link) => (
              <Link href={link.href} key={link.href}>
                <a className="text-xl font-medium text-green-700 dark:text-green-600">
                  {link.title}
                </a>
              </Link>
            ))}
          </nav>
        ) : null}

        <div className="flex justify-between items-center">
          <span className="font-normal text-base text-black dark:text-white">
            © {new Date().getFullYear()}, Built with
            {` `}
            <a
              className="font-medium text-green-700 dark:text-green-600"
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
              className="font-medium text-green-700 dark:text-green-600"
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
              className="font-medium text-green-700 dark:text-green-600"
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
            className="text-xl text-green-700 dark:text-green-600"
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
