import MDXComponent from "@/_components/mdx-component";
import BreadcrumbStructuredData from "@/_components/structured-data/breadcrumb";
import ProfileStructuredData from "@/_components/structured-data/profile";
import { cn, getParagraphs, urlFor } from "@/_lib/helpers";
import { client } from "@/_lib/sanity/client";
import { getTopTracks } from "@/_lib/spotify";
import profilePic from "@/public/profile-pic.jpg";
import { CAREERS_QUERY } from "@repo/cms/queries";
import type { CAREERS_QUERY_RESULT } from "@repo/cms/types";
import { about } from "content-collections";
import dayjs from "dayjs";
import Image from "next/image";
import { type CSSProperties } from "react";

const ALBUM_ART_DIMENSIONS = 75;

const HomePage = async () => {
  const topTracks = await getTopTracks();
  const career = client
    ? await client.fetch<CAREERS_QUERY_RESULT>(CAREERS_QUERY)
    : [];

  return (
    <>
      <Image
        src={profilePic}
        width={240}
        height={240}
        alt="A picture of Akhila Ariyachandra"
        className="mb-4 w-44 rounded-sm sm:float-left sm:mr-5 sm:mb-5 sm:w-60 sm:rounded-lg"
        placeholder="blur"
        priority
      />

      <h1 className="font-display mb-4 text-3xl tracking-tighter text-zinc-600 sm:mb-5 sm:text-4xl dark:text-zinc-300">
        Hi, I&apos;m{" "}
        <span className="text-accent dark:text-accent-dark font-black">
          Akhila Ariyachandra
        </span>
      </h1>

      <MDXComponent mdx={about.mdx} />

      <section className="my-10 space-y-4 text-zinc-600 sm:my-20 sm:space-y-8 dark:text-zinc-300">
        <h2 className="font-display text-2xl font-bold tracking-tighter sm:text-3xl">
          Career
        </h2>

        <ol className="space-y-3 sm:space-y-6">
          {career.map((job) => {
            const descriptionParagraphs = getParagraphs(job.description);

            return (
              <li
                key={job._id}
                className="space-y-1.5 border-zinc-200 pb-3 not-last:border-b sm:space-y-3 sm:pb-6 dark:border-zinc-700"
              >
                <div className="flex flex-row items-center gap-2 sm:gap-4">
                  <Image
                    src={
                      urlFor(job.employer.logo)?.width(50).height(50).url() ??
                      profilePic
                    }
                    alt={job.employer.logo.alt}
                    width={50}
                    height={50}
                    className="rounded"
                  />

                  <div className="flex-1">
                    <h3 className="font-display text-xl font-semibold tracking-tighter sm:text-2xl">
                      {job.position}
                    </h3>

                    <a
                      href={job.employer.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent dark:text-accent-dark text-lg font-medium hover:underline sm:text-xl"
                    >
                      {job.employer.name}
                    </a>

                    <JobDuration
                      start={job.startDate}
                      end={job.endDate}
                      className="sm:hidden"
                    />
                  </div>

                  <JobDuration
                    start={job.startDate}
                    end={job.endDate}
                    className="hidden sm:block"
                  />
                </div>

                <ul className="list-outside list-disc pl-5 text-sm sm:text-base">
                  {descriptionParagraphs.map((paragraph) => {
                    return (
                      <li key={paragraph} className="text-pretty">
                        {paragraph}
                      </li>
                    );
                  })}
                </ul>

                <ul className="flex flex-row flex-wrap gap-1 text-xs sm:gap-2 sm:text-sm">
                  {job.technologies.map((technology) => (
                    <li key={technology._id}>
                      <a
                        href={technology.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-row items-center gap-1 rounded-md border border-zinc-200 p-1 text-pretty sm:p-2 dark:border-zinc-700"
                      >
                        {!!technology.logo && (
                          <Image
                            src={
                              urlFor(technology.logo)
                                ?.width(30)
                                .height(30)
                                .url() ?? profilePic
                            }
                            alt={technology.name}
                            width={30}
                            height={30}
                            className="size-5 rounded-md sm:size-7.5"
                          />
                        )}

                        <span>{technology.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="my-10 space-y-4 text-zinc-600 sm:my-20 sm:space-y-8 dark:text-zinc-300">
        <div className="space-y-0.5 sm:space-y-1">
          <h2 className="font-display text-2xl font-bold tracking-tighter sm:text-3xl">
            Top Tracks
          </h2>

          <p className="text-sm sm:text-base">
            These are the tracks that I&apos;ve been listening to the most
            recently, updated daily.
          </p>
        </div>

        <ul
          className="space-y-2 sm:space-y-4"
          style={
            {
              "--album-art-dimensions": `${ALBUM_ART_DIMENSIONS.toString()}px`,
            } as CSSProperties
          }
        >
          {topTracks.items.map((track) => {
            const albumArt = track.album.images.find(
              (image) => image.width >= ALBUM_ART_DIMENSIONS,
            )?.url;

            if (!albumArt) {
              return null;
            }

            return (
              <li key={track.id} className="flex flex-row items-center gap-4">
                <a
                  href={track.album.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0"
                >
                  <Image
                    src={albumArt}
                    alt={track.name}
                    width={ALBUM_ART_DIMENSIONS}
                    height={ALBUM_ART_DIMENSIONS}
                    className="size-[50px] rounded-sm sm:size-(--album-art-dimensions)"
                  />

                  <span className="sr-only">{track.name}</span>
                </a>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-lg font-medium sm:text-xl">
                    <a
                      href={track.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent dark:text-accent-dark hover:underline"
                    >
                      {track.name}
                    </a>
                  </p>

                  <p className="truncate text-sm sm:text-base">
                    {track.artists.map((artist) => artist.name).join(", ")}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <ProfileStructuredData />
      <BreadcrumbStructuredData items={[{ name: "Home", route: "/" }]} />
    </>
  );
};

export default HomePage;

const JobDuration = async ({
  start,
  end,
  className,
}: {
  start: string;
  end?: string;
  className?: string;
}) => {
  const startDate = dayjs(start, "YYYY-MM-DD");
  const endDate = end ? dayjs(end, "YYYY-MM-DD") : dayjs();

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
