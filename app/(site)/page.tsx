import dayjs from "dayjs";
import config from "@/lib/config";
import prisma from "@/prisma";
import coverPic from "@/public/cover-pic.jpg";
import Image from "next/image";
import MDXComponent from "@/components/MDXComponent";
import PostLink from "@/components/PostLink";
import sanityClient, { urlFor } from "@/lib/sanity-client";
import type { FC } from "react";
import type { Job } from "@/lib/types";
import { groq } from "next-sanity";
import { serialize } from "next-mdx-remote/serialize";
import { getPeriod } from "@/lib/helpers";
import { getBlogPosts } from "@/utils/sanity";
import { FaDev, FaGithub, FaRssSquare, FaTwitterSquare } from "react-icons/fa";

const about = `
I'm a full stack web developer with a focus on creating front ends with [React](https://reactjs.org/).

My current interests in the JavaScript space are on awesome meta frameworks like [Next.js](https://nextjs.org/) and [Astro](https://astro.build/).

Even though I focus most of my time on front end work, technologies like [Prisma](https://www.prisma.io/) and [PlanetScale](https://planetscale.com/) keep me interested in backend work too.

I'm always on the lookout for learning and adopting bleeding edge technologies and libraries in the Web/Javascript ecosystem.
`;

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
  const blogPosts = await getBlogPosts();
  const posts = views.map((view) =>
    blogPosts.find((post) => post.slug.current === view.slug)
  );

  return posts;
};

const getJobs = async () => {
  return await sanityClient.fetch<Job[]>(groq`
    *[_type == "job"] | order(period.start desc) {
      ...,
      company ->
    }
  `);
};

const HomePage = async () => {
  const jobs = await getJobs();
  const posts = await getMostPopularPosts();

  const mdxSource = await serialize(about);

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
        <h1 className="font-sora text-3xl font-black text-zinc-800 dark:text-zinc-200 sm:text-4xl">
          {`Hi, I'm `}
          <span className="text-emerald-700 dark:text-emerald-600">
            {config.title}
          </span>
        </h1>

        <MDXComponent source={mdxSource} />

        <div className="flex flex-row space-x-2">
          <SocialLink site="GitHub" link={config.social.github} />

          <SocialLink site="DEV" link={config.social.dev} />

          <SocialLink site="Twitter" link={config.social.twitter} />

          <SocialLink site="RSS" link="/rss.xml" />
        </div>
      </div>

      <hr className="my-12 h-[1px] bg-zinc-200 dark:bg-zinc-600" />

      <section>
        <h2 className="font-sora text-3xl font-bold text-zinc-800 dark:text-zinc-200 sm:text-4xl">
          Most Popular Posts
        </h2>

        <div className="my-8 flex flex-col gap-6">
          {posts.map((post) => (
            <PostLink
              key={post.slug.current}
              title={post.title}
              slug={post.slug.current}
              date={post.date}
            />
          ))}
        </div>
      </section>

      <hr className="my-12 h-[1px] bg-zinc-200 dark:bg-zinc-600" />

      <section>
        <h2 className="font-sora text-3xl font-bold text-zinc-800 dark:text-zinc-200 sm:text-4xl">
          Career
        </h2>

        <div className="my-8 flex flex-col gap-6">
          {jobs.map((job) => (
            <article key={job._id} className="flex flex-row items-center gap-4">
              <Image
                src={urlFor(job.company.logo).url()}
                alt={`${job.company.name} logo`}
                title={job.company.name}
                width={64}
                height={64}
                className="flex-shrink-0 rounded-md"
              />

              <div className="break-words">
                <h3 className="font-sora text-lg font-semibold text-zinc-800 dark:text-zinc-200 sm:text-xl">
                  {job.position}
                </h3>

                <a
                  href={job.company.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-sora text-base font-medium text-emerald-700 dark:text-emerald-600 sm:text-lg"
                >
                  {job.company.name}
                </a>

                <div className="font-roboto-slab text-sm font-normal text-zinc-800 dark:text-zinc-200 sm:text-base">
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
                      job.period.end?.toString()
                    )})`}
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
