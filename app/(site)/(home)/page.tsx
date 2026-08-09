import MDXComponent from "@/_components/mdx-component";
import BreadcrumbStructuredData from "@/_components/structured-data/breadcrumb";
import ProfileStructuredData from "@/_components/structured-data/profile";
import { cn } from "@/_lib/helpers";
import { getAlbumArt, getTopTracks } from "@/_lib/last-fm";
import profilePic from "@/public/profile-pic.jpg";
import { about } from "content-collections";
import dayjs from "dayjs";
import { cacheLife } from "next/cache";
import Image from "next/image";
import { type CSSProperties } from "react";
import Career from "./career";

const ALBUM_ART_DIMENSIONS = 75;

const HomePage = async () => {
  const topTracks = await getTopTracks();

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
    return <div className="size-[50px] sm:size-(--album-art-dimensions)" />;
  }

  return (
    <Image
      src={albumArt ?? fallbackUrl ?? ""}
      alt={name}
      width={ALBUM_ART_DIMENSIONS}
      height={ALBUM_ART_DIMENSIONS}
      className="size-[50px] rounded-sm sm:size-(--album-art-dimensions)"
    />
  );
};
