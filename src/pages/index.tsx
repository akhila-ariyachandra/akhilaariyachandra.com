import Layout from "src/components/Layout";
import SEO from "src/components/SEO";
import Link from "next/link";
import config from "src/config";
import type { NextPage } from "next";
import { trackEvent } from "src/lib/splitbee";
import {
  FaGithub,
  FaDev,
  FaLinkedin,
  FaTwitterSquare,
  FaRssSquare,
} from "react-icons/fa";

import styles from "src/styles/index.module.scss";

const LINKS = [
  { href: "/blog", title: "Blog" },
  { href: "/career", title: "Career" },
  { href: "/about", title: "About" },
  { href: "/snippets", title: "Snippets" },
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
      className="text-3xl text-green-700 dark:text-green-600"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={site}
      onClick={() => {
        trackEvent("Open Social Link", { name: site });
      }}
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
        <h1 className="text-4xl font-black text-black dark:text-white">
          {config.title}
        </h1>

        <p className="text-lg font-medium text-black dark:text-white">
          {config.description}
        </p>

        <nav className={`flex flex-row space-x-3 flex-wrap ${styles.indexNav}`}>
          {LINKS.map((link) => (
            <Link href={link.href} key={link.href}>
              <a className="text-3xl font-medium text-green-700 dark:text-green-600">
                {link.title}
              </a>
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
