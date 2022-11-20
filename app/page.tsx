import dayjs from "dayjs";
import config from "@/lib/config";
import prisma from "@/prisma";
import coverPic from "@/public/cover-pic.jpg";
import Image from "next/image";
import MDXComponent from "@/components/MDXComponent";
import PostLink from "@/components/PostLink";
import type { FC } from "react";
import { about, career, allPosts } from "contentlayer/generated";
import { getPeriod, formatDate } from "@/lib/helpers";
import { FaDev, FaGithub, FaRssSquare, FaTwitterSquare } from "react-icons/fa";

// https://beta.nextjs.org/docs/api-reference/segment-config
export const revalidate = 3600;

const SocialIcons = {
  GitHub: FaGithub,
  DEV: FaDev,
  Twitter: FaTwitterSquare,
  RSS: FaRssSquare,
};

interface SocialIconsProps {
  site: keyof typeof SocialIcons;
  link: string;
}

const SocialLink: FC<SocialIconsProps> = ({ site, link }) => {
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

const getMostPopularPosts = async () => {
  // Get most popular posts
  const views = await prisma.views.findMany({
    orderBy: {
      count: "desc",
    },
    take: 3,
  });
  const posts = views.map((view) =>
    allPosts.find((post) => post.slug === view.slug)
  );

  return posts;
};

const HomePage = async () => {
  const jobs = career.jobs;
  const posts = await getMostPopularPosts();

  return (
    <>
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
          Most Popular Posts
        </h2>

        <div className="my-8 flex flex-col gap-6">
          {posts.map((post) => (
            <PostLink
              key={post.slug}
              title={post.title}
              slug={post.slug}
              date={formatDate(post.date)}
            />
          ))}
        </div>
      </section>

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

export default HomePage;
