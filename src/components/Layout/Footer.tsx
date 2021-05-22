import React from "react";
import splitbee from "@/lib/splitbee";
import Link from "next/link";
import NowPlaying from "@/components/NowPlaying";
import { IoAnalyticsSharp } from "react-icons/io5";

const LINKS = [
  { href: "/blog", title: "Blog" },
  { href: "/career", title: "Career" },
  { href: "/about", title: "About" },
  { href: "/snippets", title: "Snippets" },
  { href: "/dashboard", title: "Dashboard" },
];

const ExternalLink = ({ children, link }) => (
  <a
    className="dark:text-green-500 text-green-800 font-semibold"
    href={link}
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
);

const Footer: React.FunctionComponent = () => {
  return (
    <footer className="full-bleed wrapper mt-20 dark:bg-gray-800 bg-green-200">
      <div className="flex flex-col px-4 py-4 space-y-6">
        <NowPlaying />

        <nav className="grid gap-2 grid-cols-2 sm:grid-cols-3">
          {LINKS.map((link) => (
            <Link href={link.href} key={link.href}>
              <a className="dark:text-gray-300 text-green-900 text-xl font-medium">
                {link.title}
              </a>
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-between">
          <span className="dark:text-gray-200 text-gray-800 text-base font-medium">
            © {new Date().getFullYear()}, Built with
            {` `}
            <ExternalLink link="https://nextjs.org/">Next.js</ExternalLink>
            {", "}
            <ExternalLink link="https://tailwindcss.com/">
              Tailwind CSS
            </ExternalLink>
            {", & "}
            <ExternalLink link="https://vercel.com/home">Vercel</ExternalLink>
          </span>

          <a
            href="https://app.splitbee.io/public/akhilaariyachandra.com"
            target="_blank"
            rel="noopener noreferrer"
            className="dark:text-yellow-400 text-yellow-600 text-xl"
            onClick={() => {
              splitbee.track("Open Link", { name: "Analytics" });
            }}
            aria-label="Analytics"
          >
            <IoAnalyticsSharp />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
