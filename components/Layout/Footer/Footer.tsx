import NowPlaying from "./NowPlaying";
import Link from "next/link";
import type { ReactNode, ComponentProps } from "react";

const LINKS: (
  | {
      href: ComponentProps<typeof Link>["href"];
      title: string;
      external: false;
    }
  | {
      href: string;
      title: string;
      external: true;
    }
)[] = [
  { href: "/blog", title: "Blog", external: false },
  { href: "/snippets", title: "Snippets", external: false },
  { href: "/dashboard", title: "Dashboard", external: false },
  { href: "https://resume.io/r/ivBMtgAHg", title: "CV", external: true },
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
          {LINKS.map((link) =>
            !link?.external ? (
              <Link
                href={link.href}
                key={link.title}
                className="font-sora text-lg font-medium text-emerald-900 dark:text-zinc-300 sm:text-xl"
              >
                {link.title}
              </Link>
            ) : (
              <a
                href={link.href}
                key={link.title}
                className="font-sora text-lg font-medium text-emerald-900 dark:text-zinc-300 sm:text-xl"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.title}
              </a>
            )
          )}
        </nav>

        <div className="font-sora text-sm font-medium text-zinc-800 dark:text-zinc-200 sm:text-base">
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
