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
      <Suspense
        fallback={
          <section className="text-zinc-600 dark:text-zinc-300">
            Loading Career...
          </section>
        }
      >
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
    <section className="my-10 space-y-4 text-zinc-600 sm:my-20 sm:space-y-8 dark:text-zinc-300">
      <h2 className="font-display text-2xl font-bold tracking-tighter sm:text-3xl">
        Career
      </h2>

      <ol className="space-y-3 sm:space-y-6">
        {jobs.map((job) => (
          <li
            key={job._id}
            className="space-y-1.5 border-zinc-200 pb-3 not-last:border-b sm:space-y-3 sm:pb-6 dark:border-zinc-700"
          >
            <div className="flex flex-row items-center gap-2 sm:gap-4">
              <Image
                src={urlFor(job.company.logo).width(50).height(50).url()}
                alt={job.company.name}
                width={50}
                height={50}
                className="rounded"
              />

              <div className="flex-1">
                <h3 className="font-display text-xl font-semibold tracking-tighter sm:text-2xl">
                  {job.position}
                </h3>

                <a
                  href={job.company.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent dark:text-accent-dark text-lg font-medium hover:underline sm:text-xl"
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

            <ul className="flex flex-row flex-wrap gap-1 text-xs sm:gap-2 sm:text-sm">
              {job.technologies.map((technology) => (
                <li key={technology._id}>
                  <a
                    href={technology.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full border border-zinc-200 px-0.5 py-0.5 text-pretty sm:px-1.5 sm:py-1 dark:border-zinc-700"
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
