import NowPlaying from "./NowPlaying";
import Link from "next/link";
import type { ReactNode, ComponentProps } from "react";

const LINKS: {
  href: ComponentProps<typeof Link>["href"];
  title: string;
}[] = [
  { href: "/blog", title: "Blog" },
  { href: "/snippets", title: "Snippets" },
  { href: "/dashboard", title: "Dashboard" },
];

interface ExternalLinkProps {
  children: ReactNode;
  link: string;
}

const ExternalLink = ({ children, link }: ExternalLinkProps) => (
  <a
    className="font-semibold text-emerald-800 dark:text-emerald-500"
    href={link}
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
);

const Footer = () => {
  return (
    <footer className="mt-10 bg-emerald-200 dark:bg-zinc-800">
      <div className="container flex max-w-3xl flex-col space-y-6 px-4 py-6">
        <NowPlaying />

        <nav className="grid grid-cols-2 justify-items-start gap-2 sm:grid-cols-3">
          {LINKS.map((link) => (
            <Link
              href={link.href}
              key={link.title}
              className="font-display text-lg font-medium text-emerald-900 dark:text-zinc-300 sm:text-xl"
            >
              {link.title}
            </Link>
          ))}
        </nav>

        <div className="font-display text-sm font-medium text-zinc-800 dark:text-zinc-200 sm:text-base">
          © 2019 - {new Date().getFullYear()}, Built with
          {` `}
          <ExternalLink link="https://nextjs.org/">Next.js</ExternalLink>
          {", "}
          <ExternalLink link="https://tailwindcss.com/">
            Tailwind CSS
          </ExternalLink>
          {", "}
          <ExternalLink link="https://www.contentlayer.dev/">
            Contentlayer
          </ExternalLink>
          {", "}
          <ExternalLink link="https://planetscale.com/">
            PlanetScale
          </ExternalLink>
          {", "}
          <ExternalLink link="https://github.com/drizzle-team/drizzle-orm">
            Drizzle ORM
          </ExternalLink>
          {", & "}
          <ExternalLink link="https://vercel.com/home">Vercel</ExternalLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
