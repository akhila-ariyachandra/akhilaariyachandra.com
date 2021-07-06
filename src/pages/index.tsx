import { useState, useEffect } from "react";
import splitbee from "@/lib/splitbee";
import config from "@/lib/config";
import fs from "fs";
import path from "path";
import yaml from "yaml";
import profile from "@/public/profile.jpg";
import { LIGHT_COLORS } from "@/lib/constants";
import { shuffleArray } from "@/lib/helpers";
import Image from "next/image";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Highlight from "@/components/Highlight";
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
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";

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
  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    setColors(shuffleArray(LIGHT_COLORS));
  }, []);

  return (
    <Layout>
      <SEO />

      <div id="about" className="lg:flex lg:flex-row lg:items-center">
        <RoughNotationGroup show={true}>
          <div className="space-y-5">
            <h1 className="text-gray-800 text-3xl font-bold lg:text-4xl">
              {`Hi, I'm `}
              <Highlight color={colors[0]}>{config.title}</Highlight>
            </h1>

            <p className="text-gray-700 text-lg font-medium">
              {`I am a `}
              <Highlight color={colors[1]}>web developer</Highlight>
              {` working at `}
              <Highlight color={colors[2]}>{currentJob.company}</Highlight>
              {` as a `}
              <Highlight color={colors[3]}>
                {currentJob.positions[0].title}
              </Highlight>
              {`. You have found my personal corner of the internet.`}
            </p>
          </div>
        </RoughNotationGroup>

        <div
          className="flex-shrink-0 mt-10 rounded-full overflow-hidden lg:ml-10 lg:mt-0"
          style={{ width: 200, height: 200 }}
        >
          <Image
            src={profile}
            alt={config.title}
            title={config.title}
            placeholder="blur"
            width={200}
            height={200}
          />
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
