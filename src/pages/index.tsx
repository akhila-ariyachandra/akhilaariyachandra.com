import Layout from "src/components/Layout";
import SEO from "src/components/SEO";
import Link from "next/link";
import config from "src/config";
import type { NextPage } from "next";
import {
  FaGithub,
  FaDev,
  FaLinkedin,
  FaTwitterSquare,
  FaRssSquare,
} from "react-icons/fa";

const LINKS = [
  { href: "/blog", title: "Blog" },
  { href: "/career", title: "Career" },
  { href: "/about", title: "About" },
];

const SocialLink = ({ site, link }) => {
  let Icon = null;

  switch (site) {
    case "GitHub":
      Icon = FaGithub;
      break;
    case "DEV":
      Icon = FaDev;
      break;
    case "LinkedIn":
      Icon = FaLinkedin;
      break;
    case "Twitter":
      Icon = FaTwitterSquare;
      break;
    case "RSS":
      Icon = FaRssSquare;
      break;
    default:
      Icon = null;
  }

  return (
    <a
      className="text-3xl sm:text-4xl"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={site}
    >
      <Icon />
    </a>
  );
};

const Index: NextPage = () => {
  return (
    <Layout>
      <SEO />

      <div className="px-4 space-y-4">
        <h1 className="text-4xl sm:text-5xl font-black">{config.title}</h1>

        <p className="text-lg sm:text-xl font-medium">{config.description}</p>

        <nav className="flex flex-row space-x-3">
          {LINKS.map((link) => (
            <Link href={link.href} key={link.href}>
              <a className="text-3xl sm:text-4xl font-medium">{link.title}</a>
            </Link>
          ))}
        </nav>

        <div className="flex flex-row space-x-2">
          <SocialLink site="GitHub" link={config.social.github} />

          <SocialLink site="DEV" link={config.social.dev} />

          <SocialLink site="LinkedIn" link={config.social.linkedin} />

          <SocialLink site="Twitter" link={config.social.twitter} />

          <SocialLink site="RSS" link="/rss.xml" />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
