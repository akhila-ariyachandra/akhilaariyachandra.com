import splitbee from "@/lib/splitbee";
import config from "@/lib/config";
import coverPic from "@/public/cover-pic.jpg";
import career from "@/lib/data/career";
import Image from "next/future/image";
import Link from "next/link";
import SEO from "@/components/SEO";
import type { NextPage } from "next";
import { getAOrAn } from "@/lib/helpers";
import { FaGithub, FaDev, FaTwitterSquare, FaRssSquare } from "react-icons/fa";

const CURRENT_JOB = career[0];

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
      className="text-3xl text-emerald-700 dark:text-emerald-600"
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
    <>
      <SEO />

      <Image
        src={coverPic}
        alt={config.title}
        title={config.title}
        className="mb-10 rounded-lg"
        priority
        placeholder="blur"
      />

      <div className="mt-4 space-y-4">
        <h1 className="font-sora text-4xl font-black text-zinc-800 dark:text-zinc-200">
          {`Hi, I'm `}
          <span className="text-emerald-700 dark:text-emerald-600">
            {config.title}
          </span>
        </h1>

        <p className="font-roboto-slab text-lg font-medium text-zinc-800 dark:text-zinc-200">
          {`I am a web developer working at `}
          <a
            className="text-emerald-700 dark:text-emerald-600"
            href={CURRENT_JOB.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {CURRENT_JOB.company}
          </a>
          {` as ${getAOrAn(CURRENT_JOB.positions[0].title)} `}
          <Link href="/career">
            <a className="text-emerald-700 dark:text-emerald-600">
              {CURRENT_JOB.positions[0].title}
            </a>
          </Link>
          {`. You have found my personal corner of the internet.`}
        </p>

        <div className="flex flex-row space-x-2">
          <SocialLink site="GitHub" link={config.social.github} />

          <SocialLink site="DEV" link={config.social.dev} />

          <SocialLink site="Twitter" link={config.social.twitter} />

          <SocialLink site="RSS" link="/rss.xml" />
        </div>
      </div>
    </>
  );
};

export default Index;
