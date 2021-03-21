import splitbee from "@/lib/splitbee";
import config from "@/lib/config";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import type { NextPage } from "next";
import {
  FaGithub,
  FaDev,
  FaLinkedin,
  FaTwitterSquare,
  FaSpotify,
  FaRssSquare,
  FaSteam,
} from "react-icons/fa";

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
    case "Spotify":
      Icon = FaSpotify;
      break;
    case "Steam":
      Icon = FaSteam;
      break;
    case "RSS":
      Icon = FaRssSquare;
      break;
    default:
      Icon = null;
  }

  return (
    <a
      className="dark:text-green-600 text-green-700 text-3xl"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={site}
      onClick={() => {
        splitbee.track("Open Social Link", { name: site });
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
        <h1 className="dark:text-gray-200 text-gray-800 text-4xl font-black">
          {config.title}
        </h1>

        <p className="dark:text-gray-200 text-gray-800 text-lg font-medium">
          {config.description}
        </p>

        <div className="flex flex-row space-x-2">
          <SocialLink site="GitHub" link={config.social.github} />

          <SocialLink site="DEV" link={config.social.dev} />

          <SocialLink site="LinkedIn" link={config.social.linkedin} />

          <SocialLink site="Twitter" link={config.social.twitter} />

          <SocialLink site="Spotify" link={config.social.spotify} />

          <SocialLink site="Steam" link={config.social.steam} />

          <SocialLink site="RSS" link="/rss.xml" />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
