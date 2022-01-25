import Image from "next/image";
import type { Song } from "@/lib/types";
import type { FC } from "react";
import { useQuery } from "react-query";
import { fetcher } from "@/lib/helpers";

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
      <h2 className="mt-6 font-sora text-3xl font-semibold text-gray-800 dark:text-gray-200">
        Top Tracks
      </h2>

      <p className="mb-6 mt-4 font-roboto-slab text-lg text-gray-500 dark:text-gray-300">
        Interested to know what I&apos;m listening to? Here are my top tracks in
        Spotify updated daily.
      </p>

      <div className="flex flex-col space-y-3 divide-y divide-gray-200 dark:divide-gray-600">
        {data.map((track, index) => (
          <div
            key={`top-track-${index}`}
            className="flex flex-row items-center space-x-6 pt-3"
          >
            <div className="flex-shrink-0">
              <Image
                src={track.albumImage}
                width={80}
                height={80}
                alt={track.album}
                title={track.album}
                className="rounded-sm"
              />
            </div>

            <div className="truncate">
              <a
                href={track.songUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate font-sora text-lg font-medium text-emerald-700 dark:text-emerald-600"
              >
                {track.name}
              </a>

              <p className="truncate font-roboto-slab text-gray-500 dark:text-gray-300">
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
