import splitbee from "@/lib/splitbee";
import config from "@/lib/config";
import fs from "fs";
import path from "path";
import YAML from "yaml";
import coverPic from "@/public/cover-pic.jpg";
import Image from "next/image";
import SEO from "@/components/SEO";
import type { NextPage, GetStaticProps } from "next";
import type { Job } from "@/lib/types";
import { useState, useEffect } from "react";
import { getAOrAn } from "@/lib/helpers";
import { FaGithub, FaDev, FaTwitterSquare, FaRssSquare } from "react-icons/fa";
import { HighlightGroup, Highlight } from "@/components/Highlight";

const SocialLink = ({
  site,
  link,
}: {
  site: "GitHub" | "DEV" | "Twitter" | "RSS";
  link: string;
}) => {
  let Icon = null;

  switch (site) {
    case "GitHub":
      Icon = FaGithub;
      break;
    case "DEV":
      Icon = FaDev;
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
      className="dark:text-emerald-600 text-emerald-700 text-3xl"
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
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    setHighlight(true);
  }, []);

  return (
    <>
      <SEO />

      <Image
        src={coverPic}
        alt={config.title}
        title={config.title}
        className="rounded-lg"
        priority
        placeholder="empty"
      />

      <HighlightGroup>
        <div className="mt-4 space-y-4">
          <h1 className="dark:text-gray-200 text-gray-800 font-sora text-4xl font-black">
            {`Hi, I'm `}
            <Highlight>{config.title}</Highlight>
          </h1>

          <p className="dark:text-gray-200 text-gray-800 font-roboto-slab text-lg font-medium">
            {`I am a web developer working at `}
            <Highlight>{currentJob.company}</Highlight>
            {` as ${getAOrAn(currentJob.positions[0].title)} `}
            <Highlight>{currentJob.positions[0].title}</Highlight>
            {`. You have found my personal corner of the internet.`}
          </p>

          <div className="flex flex-row space-x-2">
            <SocialLink site="GitHub" link={config.social.github} />

            <SocialLink site="DEV" link={config.social.dev} />

            <SocialLink site="Twitter" link={config.social.twitter} />

            <SocialLink site="RSS" link="/rss.xml" />
          </div>
        </div>
      </HighlightGroup>
    </>
  );
};

export default Index;

export const getStaticProps: GetStaticProps = async () => {
  // Get current job
  const careerFile = path.join("content", "career.yaml");
  const file = fs.readFileSync(careerFile, "utf8");
  const fileContent = YAML.parse(file);

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
    props: {
      currentJob,
    },
  };
};
