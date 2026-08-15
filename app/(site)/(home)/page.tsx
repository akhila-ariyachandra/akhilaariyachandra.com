import BreadcrumbStructuredData from "@/_components/structured-data/breadcrumb";
import ProfileStructuredData from "@/_components/structured-data/profile";
import { cn } from "@/_lib/helpers";
import { getAlbumArt, getTopTracks } from "@/_lib/last-fm";
import { type PERSONAL_INFO_QUERY_RESULT } from "@/sanity/generated/types";
import { urlFor } from "@/sanity/lib/image";
import {
  getDynamicFetchOptions,
  sanityFetch,
  type DynamicFetchOptions,
} from "@/sanity/lib/live";
import { CAREERS_QUERY, PERSONAL_INFO_QUERY } from "@/sanity/lib/queries";
import { type Route } from "next";
import { PortableText, type InferComponents } from "next-sanity";
import { draftMode } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { Suspense, type CSSProperties } from "react";
import Career from "./career";
import ResumeButton from "./resume-button";

const ALBUM_ART_DIMENSIONS = 75;

const HomePage = async () => {
  const { isEnabled: isDraftMode } = await draftMode();

  const topTracks = await getTopTracks();

  return (
    <>
      {isDraftMode ? (
        <Suspense
          fallback={
            <div className="text-zinc-600 dark:text-zinc-300">
              Loading About...
            </div>
          }
        >
          <DynamicAbout />
        </Suspense>
      ) : (
        <CachedAbout perspective="published" stega={false} />
      )}

      <Career />

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
          {topTracks.map((track) => {
            const albumArt = track.image.find(
              (image) => image.size === "extralarge",
            )?.["#text"];

            return (
              <li
                key={track.mbid ? track.mbid : track.url}
                className="flex flex-row items-center gap-4"
              >
                <a
                  href={track.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0"
                >
                  <AlbumArt
                    name={track.name}
                    artist={track.artist.name}
                    fallbackUrl={albumArt}
                  />

                  <span className="sr-only">{track.name}</span>
                </a>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-lg font-medium sm:text-xl">
                    <a
                      href={track.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent dark:text-accent-dark hover:underline"
                    >
                      {track.name}
                    </a>
                  </p>

                  <p className="truncate text-sm sm:text-base">
                    {track.artist.name}
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

const DynamicAbout = async () => {
  const { perspective, stega } = await getDynamicFetchOptions();

  return <CachedAbout perspective={perspective} stega={stega} />;
};

const CachedAbout = async ({ perspective, stega }: DynamicFetchOptions) => {
  "use cache";

  const { data } = await sanityFetch({
    query: PERSONAL_INFO_QUERY,
    perspective,
    stega,
  });

  if (!data) {
    return null;
  }

  return (
    <>
      <Image
        src={urlFor(data.picture).width(240).height(240).url()}
        width={240}
        height={240}
        alt="Akhila Ariyachandra"
        className="mb-4 w-44 rounded-sm sm:float-left sm:mr-5 sm:mb-5 sm:w-60 sm:rounded-lg"
        priority
      />

      <h1 className="font-display mb-4 text-3xl tracking-tighter text-zinc-600 sm:mb-5 sm:text-4xl dark:text-zinc-300">
        Hi, I&apos;m{" "}
        <span className="text-accent dark:text-accent-dark font-black">
          Akhila Ariyachandra
        </span>
      </h1>

      <div
        className={cn(
          "prose prose-sm prose-zinc sm:prose-base dark:prose-invert max-w-none", // Base styles
          "prose-a:font-medium prose-a:text-accent prose-a:no-underline prose-a:hover:underline dark:prose-a:text-accent-dark", // Links
        )}
      >
        <PortableText
          value={data.about}
          components={
            {
              types: {
                latestJob: async () => {
                  const { data } = await sanityFetch({
                    query: CAREERS_QUERY,
                    perspective,
                    stega,
                  });

                  const latestJob = data.at(0);

                  if (!latestJob) {
                    return null;
                  }

                  const firstLetter =
                    latestJob.position.toLowerCase().at(0) ?? "";

                  return (
                    <>
                      {["a", "e", "i", "o", "u"].includes(firstLetter)
                        ? "an"
                        : "a"}{" "}
                      {latestJob.position} at{" "}
                      <a
                        href={latestJob.company.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {latestJob.company.name}
                      </a>
                    </>
                  );
                },
              },
              marks: {
                link: ({ value, children }) => {
                  if (!value) {
                    return children;
                  }

                  if (!value.openInNewTab) {
                    return (
                      <Link href={value.url as Route} title={value.label}>
                        {children}
                      </Link>
                    );
                  }

                  return (
                    <a
                      href={value.url}
                      title={value.label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  );
                },
              },
            } satisfies InferComponents<
              NonNullable<PERSONAL_INFO_QUERY_RESULT>["about"]
            >
          }
        />
      </div>

      <div className="my-4 flex flex-row gap-4 sm:my-6">
        <ResumeButton resume={data.resume} />
      </div>
    </>
  );
};

const AlbumArt = async ({
  name,
  artist,
  fallbackUrl,
}: {
  name: string;
  artist: string;
  fallbackUrl?: string | undefined;
}) => {
  const albumArt = await getAlbumArt(name, artist);

  if (!albumArt && !fallbackUrl) {
    return <div className="size-12.5 sm:size-(--album-art-dimensions)" />;
  }

  return (
    <Image
      src={albumArt ?? fallbackUrl ?? ""}
      alt={name}
      width={ALBUM_ART_DIMENSIONS}
      height={ALBUM_ART_DIMENSIONS}
      className="size-12.5 rounded-sm sm:size-(--album-art-dimensions)"
    />
  );
};
