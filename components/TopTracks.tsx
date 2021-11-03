import Image from "next/image";
import type { Song } from "@/lib/types";
import type { FC } from "react";
import { useQuery } from "react-query";
import { fetcher } from "@/lib/helpers";

import styles from "@/components/TopTracks.module.scss";

const TopTracks: FC = () => {
  const { data } = useQuery<Song[], Error>(
    "topTracks",
    () => fetcher("/api/spotify/top-tracks"),
    {
      placeholderData: [],
      staleTime: 86400000, // Don't refetch for 1 day
    }
  );

  return (
    <div className="my-10">
      <h2 className="mt-6 dark:text-gray-200 text-gray-800 font-sora text-3xl font-semibold">
        Top Tracks
      </h2>

      <p className="mb-6 mt-4 dark:text-gray-300 text-gray-500 font-roboto-slab text-lg">
        Interested to know what I&apos;m listening to? Here are my top tracks in
        Spotify updated daily.
      </p>

      <div className="flex flex-col divide-gray-200 dark:divide-gray-600 divide-y space-y-3">
        {data.map((track, index) => (
          <div
            key={`top-track-${index}`}
            className="flex flex-row items-center pt-3 space-x-6"
          >
            <div className={styles.albumContainer}>
              <Image
                src={track.albumImage}
                width={80}
                height={80}
                alt={track.album}
                title={track.album}
                placeholder="blur"
                blurDataURL={track.blurAlbumImage}
              />
            </div>

            <div className="truncate">
              <a
                href={track.songUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="dark:text-green-600 text-green-700 font-sora text-lg font-medium truncate"
              >
                {track.name}
              </a>

              <p className="dark:text-gray-300 text-gray-500 font-roboto-slab truncate">
                {track.artist}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopTracks;
