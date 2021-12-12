import splitbee from "@/lib/splitbee";
import Link from "next/link";
import NowPlaying from "@/components/NowPlaying";
import { IoAnalyticsSharp } from "react-icons/io5";

const LINKS = [
  { href: "/blog", title: "Blog" },
  { href: "/career", title: "Career" },
  { href: "/snippets", title: "Snippets" },
  { href: "/dashboard", title: "Dashboard" },
];

const ExternalLink = ({ children, link }) => (
  <a
    className="dark:text-emerald-500 text-emerald-800 font-semibold"
    href={link}
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
);

const Footer: React.FunctionComponent = () => {
  return (
    <footer className="mt-10 dark:bg-gray-800 bg-emerald-200">
      <div className="container flex flex-col px-4 py-6 max-w-4xl space-y-6">
        <NowPlaying />

        <nav className="grid gap-2 grid-cols-2 sm:grid-cols-3">
          {LINKS.map((link) => (
            <Link href={link.href} key={link.href}>
              <a className="dark:text-gray-300 text-emerald-900 font-sora text-xl font-medium">
                {link.title}
              </a>
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-between">
          <span className="dark:text-gray-200 text-gray-800 font-sora text-base font-medium">
            © 2019 - {new Date().getFullYear()}, Built with
            {` `}
            <ExternalLink link="https://nextjs.org/">Next.js</ExternalLink>
            {", "}
            <ExternalLink link="https://tailwindcss.com/">
              Tailwind CSS
            </ExternalLink>
            {", "}
            <ExternalLink link="https://planetscale.com/">
              PlanetScale
            </ExternalLink>
            {", & "}
            <ExternalLink link="https://vercel.com/home">Vercel</ExternalLink>
          </span>

          <a
            href="https://app.splitbee.io/public/akhilaariyachandra.com"
            target="_blank"
            rel="noopener noreferrer"
            className="dark:text-yellow-400 text-yellow-600 font-sora text-xl"
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

export default Footer;
