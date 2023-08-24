import dayjs from "dayjs";
import config from "@/lib/config";
import profilePic from "@/public/profile_pic.png";
import Image from "next/image";
import Balancer from "react-wrap-balancer";
import MDXComponent from "@/components/MDXComponent";
import MostPopularPosts from "./MostPopularPosts";
import { getPeriod } from "@/lib/server-helpers";
import { FaDev, FaGithub, FaRssSquare, FaTwitterSquare } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { about, allJobs } from ".contentlayer/generated";

export const revalidate = 86400;

const SocialIcons = {
  Email: MdEmail,
  GitHub: FaGithub,
  DEV: FaDev,
  Twitter: FaTwitterSquare,
  RSS: FaRssSquare,
};

interface SocialIconsProps {
  site: keyof typeof SocialIcons;
  link: string;
}

const SocialLink = ({ site, link }: SocialIconsProps) => {
  const Icon = SocialIcons[site];

  return (
    <a
      className="text-3xl text-emerald-700 dark:text-emerald-600"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={site}
    >
      <Icon />
    </a>
  );
};

const HomePage = () => {
  return (
    <>
      <div className="mt-4 space-y-6">
        <Image
          src={profilePic}
          alt={config.title}
          title={config.title}
          className="h-40 w-40 rounded-lg sm:h-48 sm:w-48 md:float-left md:mr-6"
          width={192}
          height={192}
          priority
          placeholder="blur"
        />

        <h1 className="font-display text-3xl font-black text-zinc-800 dark:text-zinc-200 sm:text-4xl">
          <Balancer>
            {`Hi, I'm `}
            <span className="text-emerald-700 dark:text-emerald-600">
              {config.title}
            </span>
          </Balancer>
        </h1>

        <MDXComponent code={about.body.code} />

        <div className="flex flex-row space-x-2">
          <SocialLink site="Email" link="mailto:akhila_ariyachandra@live.com" />

          <SocialLink site="GitHub" link={config.social.github} />

          <SocialLink site="DEV" link={config.social.dev} />

          <SocialLink site="Twitter" link={config.social.twitter} />

          <SocialLink site="RSS" link="/rss.xml" />
        </div>
      </div>

      <hr className="my-12 h-[1px] bg-zinc-200 dark:bg-zinc-600" />

      <section>
        <h2 className="font-display text-3xl font-bold text-zinc-800 dark:text-zinc-200 sm:text-4xl">
          Most Popular Posts
        </h2>
        <div className="my-8 flex flex-col gap-6">
          <MostPopularPosts />
        </div>
      </section>

      <hr className="my-12 h-[1px] bg-zinc-200 dark:bg-zinc-600" />

      <section>
        <h2 className="font-display text-3xl font-bold text-zinc-800 dark:text-zinc-200 sm:text-4xl">
          Resume
        </h2>

        <div className="my-8 flex flex-col gap-6">
          {allJobs
            .sort((a, b) =>
              dayjs(a.period.start).isBefore(b.period.start) ? 1 : -1
            )
            .map((job) => (
              <article key={`${job.position} - ${job.company.name}`}>
                <div className="flex flex-row items-center gap-4">
                  <Image
                    src={job.company.logo}
                    alt={`${job.company.name} logo`}
                    title={job.company.name}
                    width={64}
                    height={64}
                    className="flex-shrink-0 rounded-md"
                  />

                  <div className="break-words">
                    <h3 className="font-display text-lg font-semibold text-zinc-800 dark:text-zinc-200 sm:text-xl">
                      {job.position}
                    </h3>

                    <a
                      href={job.company.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block font-display text-base font-medium text-emerald-700 dark:text-emerald-600 sm:text-lg"
                    >
                      {job.company.name}
                    </a>

                    <div className="text-sm font-normal text-zinc-800 dark:text-zinc-200 sm:text-base">
                      <span>
                        {`${dayjs(job.period.start).format("MMMM YYYY")} - ${
                          job.period.end
                            ? dayjs(job.period.end).format("MMMM YYYY")
                            : "Present"
                        }`}
                      </span>
                      <span className="font-light text-zinc-600 dark:text-zinc-400">
                        {` (${getPeriod(
                          job.period.start.toString(),
                          job.period.end ? job.period.end.toString() : undefined
                        )})`}
                      </span>
                    </div>
                  </div>
                </div>

                <MDXComponent code={job.body.code} />
              </article>
            ))}
        </div>
      </section>
    </>
  );
};

export default HomePage;
