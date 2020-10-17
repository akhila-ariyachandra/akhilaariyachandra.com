import Layout from "src/components/Layout";
import SEO from "src/components/SEO";
import Link from "next/link";
import config from "src/config";
import {
  FaGithub,
  FaDev,
  FaLinkedin,
  FaTwitterSquare,
  FaRssSquare,
} from "react-icons/fa";
import { NextPage } from "next";
import { motion } from "framer-motion";

const LINKS = [
  { href: "/blog", title: "Blog" },
  { href: "/career", title: "Career" },
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

      <div className="px-4 py-32 sm:py-40 space-y-4">
        <div>
          <div className="h-12 sm:h-16 overflow-hidden">
            <motion.h1
              initial={{ y: "calc(3rem * 2)" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl font-black"
            >
              Akhila
            </motion.h1>
          </div>

          <div className="h-12 sm:h-16 overflow-hidden">
            <motion.h1
              initial={{ y: "calc(3rem * -2)" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl font-black"
            >
              Ariyachandra
            </motion.h1>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.2 }}
          className="text-lg sm:text-xl font-medium"
        >
          {config.description}
        </motion.p>

        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.2 }}
          className="flex flex-row space-x-3"
        >
          {LINKS.map((link) => (
            <Link href={link.href} key={link.href}>
              <a className="text-3xl sm:text-4xl font-medium">{link.title}</a>
            </Link>
          ))}
        </motion.nav>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.2 }}
          className="flex flex-row space-x-2"
        >
          <SocialLink site="GitHub" link={config.social.github} />

          <SocialLink site="DEV" link={config.social.dev} />

          <SocialLink site="LinkedIn" link={config.social.linkedin} />

          <SocialLink site="Twitter" link={config.social.twitter} />
        </motion.div>
      </div>
    </Layout>
  );
};

export default Index;
