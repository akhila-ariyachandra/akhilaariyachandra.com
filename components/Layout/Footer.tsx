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
    className="font-semibold text-emerald-800 dark:text-emerald-500"
    href={link}
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
);

const Footer: React.FunctionComponent = () => {
  return (
    <footer className="mt-10 bg-emerald-200 dark:bg-gray-800">
      <div className="container flex max-w-4xl flex-col space-y-6 px-4 py-6">
        <NowPlaying />

        <nav className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {LINKS.map((link) => (
            <Link href={link.href} key={link.href}>
              <a className="font-sora text-xl font-medium text-emerald-900 dark:text-gray-300">
                {link.title}
              </a>
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-between">
          <span className="font-sora text-base font-medium text-gray-800 dark:text-gray-200">
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
            className="font-sora text-xl text-yellow-600 dark:text-yellow-400"
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
