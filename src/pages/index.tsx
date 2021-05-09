import splitbee from "@/lib/splitbee";
import config from "@/lib/config";
import fs from "fs";
import path from "path";
import yaml from "yaml";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import type { NextPage, GetStaticProps } from "next";
import type { Job } from "@/lib/types";
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

type Props = {
  currentJob: Job;
};

const Index: NextPage<Props> = ({ currentJob }) => {
  return (
    <Layout>
      <SEO />

      <div className="px-4 space-y-4">
        <h1 className="dark:text-gray-200 text-gray-800 text-4xl font-black">
          {`Hi, I'm ${config.title}`}
        </h1>

        <p className="dark:text-gray-200 text-gray-800 text-lg font-medium">
          {`I am a web developer working at `}
          <a
            className="dark:text-green-600 text-green-700"
            href={currentJob.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {currentJob.company}
          </a>
          {` as a ${currentJob.positions[0].title}. You have found my personal corner of the internet.`}
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

export const getStaticProps: GetStaticProps = async () => {
  const careerFile = path.join("content", "career.yaml");
  const file = fs.readFileSync(careerFile, "utf8");
  const fileContent = yaml.parse(file);

  const careerList: Job[] = fileContent.map((element) => {
    const job: Job = {
      company: element.company,
      image: element.image,
      link: element.link,
      positions: element.positions,
      overallPeriod:
        element.positions.length > 1
          ? {
              startDate:
                element.positions[element.positions.length - 1].startDate,
              endDate: element.positions[0].endDate,
            }
          : null,
    };

    return job;
  });

  const currentJob = careerList[0];

  return {
    props: { currentJob },
  };
};
