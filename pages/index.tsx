import dayjs from "dayjs";
import config from "@/lib/config";
import splitbee from "@/lib/splitbee";
import coverPic from "@/public/cover-pic.jpg";
import Image from "next/future/image";
import SEO from "@/components/SEO";
import MDXComponent from "@/components/MDXComponent";
import type { NextPage, GetStaticProps } from "next";
import { about, type About, career, type Job } from "contentlayer/generated";
import { getPeriod } from "@/lib/helpers";
import { FaDev, FaGithub, FaRssSquare, FaTwitterSquare } from "react-icons/fa";

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

export const getStaticProps: GetStaticProps = async () => {
  const jobs = career.jobs;

  return {
    props: {
      about,
      jobs,
    },
  };
};

interface IndexPageProps {
  about: About;
  jobs: Job[];
}

const IndexPage: NextPage<IndexPageProps> = ({ about, jobs }) => {
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

      <div className="mt-4 space-y-6">
        <h1 className="font-sora text-4xl font-black text-zinc-800 dark:text-zinc-200">
          {`Hi, I'm `}
          <span className="text-emerald-700 dark:text-emerald-600">
            {config.title}
          </span>
        </h1>

        <MDXComponent code={about.body.code} />

        <div className="flex flex-row space-x-2">
          <SocialLink site="GitHub" link={config.social.github} />

          <SocialLink site="DEV" link={config.social.dev} />

          <SocialLink site="Twitter" link={config.social.twitter} />

          <SocialLink site="RSS" link="/rss.xml" />
        </div>
      </div>

      <hr className="my-12 h-[1px] bg-zinc-200 dark:bg-zinc-600" />

      <section>
        <h2 className="font-sora text-4xl font-bold text-zinc-800 dark:text-zinc-200">
          Career
        </h2>

        <div className="my-8 flex flex-col gap-6">
          {jobs.map((job) => (
            <article
              key={`${job.position}-${job.period.start.toString()}`}
              className="flex flex-row items-center gap-4"
            >
              <Image
                src={`/career/${job.company.logo}`}
                alt={`${job.company.name} logo`}
                title={job.company.name}
                width={64}
                height={64}
                className="flex-shrink-0 rounded-md"
              />

              <div className="break-words">
                <h3 className="font-sora text-xl font-semibold text-zinc-800 dark:text-zinc-200">
                  {job.position}
                </h3>

                <a
                  href={job.company.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-sora text-lg font-medium text-emerald-700 dark:text-emerald-600"
                >
                  {job.company.name}
                </a>

                <div className="font-roboto-slab text-base font-normal text-zinc-800 dark:text-zinc-200">
                  <span>
                    {`${dayjs(job.period.start).format("MMMM YYYY")} - ${
                      job.period.end
                        ? dayjs(job.period.end).format("MMMM YYYY")
                        : "Present"
                    }`}
                  </span>
                  <span className="font-light text-zinc-600 dark:text-zinc-400">
                    {` (${getPeriod(job.period.start, job.period.end)})`}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default IndexPage;
