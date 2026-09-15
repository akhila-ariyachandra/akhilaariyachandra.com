import { buttonVariants } from "@/_components/button";
import { getParagraphs } from "@/_lib/helpers";
import { urlFor } from "@/sanity/lib/image";
import {
  type DynamicFetchOptions,
  getDynamicFetchOptions,
  sanityFetch,
} from "@/sanity/lib/live";
import { CAREERS_QUERY } from "@/sanity/lib/queries";
import { cn } from "cn";
import dayjs from "dayjs";
import { cacheLife } from "next/cache";
import { draftMode } from "next/headers";
import Image from "next/image";
import { Suspense } from "react";

const Career = async () => {
  const { isEnabled: isDraftMode } = await draftMode();

  if (isDraftMode) {
    return (
      <Suspense fallback={<section>Loading Career...</section>}>
        <DynamicCareer />
      </Suspense>
    );
  }

  return <CachedCareer perspective="published" stega={false} />;
};

export default Career;

const DynamicCareer = async () => {
  const { perspective, stega } = await getDynamicFetchOptions();

  return <CachedCareer perspective={perspective} stega={stega} />;
};

const CachedCareer = async ({ perspective, stega }: DynamicFetchOptions) => {
  "use cache";

  const { data: jobs } = await sanityFetch({
    query: CAREERS_QUERY,
    perspective,
    stega,
  });

  return (
    <section className="neobrutalism-container my-10 space-y-4 p-3 sm:my-20 sm:space-y-8 sm:p-4">
      <h2 className="text-2xl font-bold sm:text-3xl">Career</h2>

      <ol className="space-y-3 sm:space-y-6">
        {jobs.map((job) => (
          <li
            key={job._id}
            className="space-y-2 border-black pb-3 not-last:border-b-2 last:pb-0 sm:space-y-4 sm:pb-6 sm:last:pb-0"
          >
            <div className="flex flex-row items-center gap-2 sm:gap-4">
              <Image
                src={urlFor(job.company.logo).width(50).height(50).url()}
                alt={job.company.name}
                width={50}
                height={50}
                className="rounded border-2 border-black"
              />

              <div className="flex-1">
                <h3 className="text-xl font-semibold sm:text-2xl">
                  {job.position}
                </h3>

                <a
                  href={job.company.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent dark:text-accent-dark text-lg hover:underline sm:text-xl"
                >
                  {job.company.name}
                </a>

                <JobDuration
                  start={job.duration.start}
                  end={job.duration.end}
                  className="sm:hidden"
                />
              </div>

              <JobDuration
                start={job.duration.start}
                end={job.duration.end}
                className="hidden sm:block"
              />
            </div>

            <ul className="list-outside list-disc pl-5 text-sm sm:text-base">
              {getParagraphs(job.description).map((paragraph) => (
                <li key={paragraph} className="text-pretty">
                  {paragraph}
                </li>
              ))}
            </ul>

            <ul className="flex flex-row flex-wrap gap-2 text-xs sm:text-sm">
              {job.technologies.map((technology) => (
                <li key={technology._id}>
                  <a
                    href={technology.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants({ size: "small" })}
                  >
                    <Image
                      src={urlFor(technology.icon).width(20).height(20).url()}
                      alt={technology.name}
                      width={20}
                      height={20}
                      className="size-4 rounded-full sm:size-5"
                    />

                    <span>{technology.name}</span>
                  </a>
                </li>
              ))}
            </ul>

            {!!job.projects && (
              <div className="neobrutalism-container space-y-1 p-1 sm:space-y-2 sm:p-2">
                <ul className="grid grid-cols-1 gap-1 md:grid-cols-2 md:gap-2">
                  {job.projects.map((project) => {
                    const paragraphs = getParagraphs(project.description);

                    return (
                      <li
                        key={project._id}
                        className="flex flex-col rounded border-2 border-black"
                      >
                        <Image
                          src={urlFor(project.cover)
                            .width(480)
                            .height(270)
                            .url()}
                          alt={project.cover.alt}
                          width={480}
                          height={270}
                          className="aspect-video shrink-0 object-cover"
                        />

                        <div className="flex flex-1 flex-col gap-2 border-t-2 border-t-black p-2 sm:gap-3 sm:p-3">
                          <h4 className="text-lg font-semibold text-balance sm:text-xl">
                            {project.name}
                          </h4>

                          <div className="flex-1 space-y-1 text-sm sm:space-y-2 sm:text-base">
                            {paragraphs.map((paragraph, index) => (
                              // eslint-disable-next-line @eslint-react/no-array-index-key
                              <p key={index} className="text-pretty">
                                {paragraph}
                              </p>
                            ))}
                          </div>

                          <ul className="flex flex-row flex-wrap gap-2">
                            {project.links.map((link) => (
                              <li key={link._key}>
                                <a
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={buttonVariants({
                                    size: "small",
                                  })}
                                >
                                  {link.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <p className="text-xs sm:text-sm">
                  All brand names, trademarks and product imagery shown here
                  remain the property of their respective owners and clients.
                  This work was produced during my time at{" "}
                  <a
                    href={job.company.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent dark:text-accent-dark font-semibold hover:underline focus:underline"
                  >
                    {job.company.name}
                  </a>{" "}
                  and is shown for portfolio purposes only.
                </p>
              </div>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
};

const JobDuration = async ({
  start,
  end,
  className,
}: {
  start: string;
  end?: string;
  className?: string;
}) => {
  "use cache";

  cacheLife("days");

  const startDate = dayjs(start, "MM/DD/YYYY");
  const endDate = end ? dayjs(end, "MM/DD/YYYY") : dayjs();

  return (
    <div className={cn("text-sm sm:text-base", className)}>
      <time dateTime={startDate.format("YYYY-MM-DD")}>
        {startDate.format("MMMM YYYY")}
      </time>{" "}
      to{" "}
      <time dateTime={endDate.format("YYYY-MM-DD")}>
        {end ? endDate.format("MMMM YYYY") : "Present"}
      </time>
    </div>
  );
};
