import React from "react";
import type { Song } from "@/lib/types";
import { useQuery } from "react-query";
import { fetcher } from "@/lib/helpers";
import { FaSpotify } from "react-icons/fa";

const NowPlaying: React.FunctionComponent = () => {
  const { data } = useQuery<Song, Error>("nowPlaying", () =>
    fetcher("/api/spotify/now-playing")
  );

  return (
    <div className="flex flex-row-reverse items-center w-full text-lg antialiased space-x-0 sm:flex-row sm:space-x-3">
      <div className="relative">
        <FaSpotify color="#1DB954" />

        {data && (
          <div
            className="absolute -right-1 -top-1 w-2 h-2 rounded-full animate-ping"
            style={{ backgroundColor: "#1DB954" }}
          />
        )}
      </div>

      <div className="inline-flex flex-col w-full max-w-full truncate sm:flex-row">
        {data?.songUrl ? (
          <a
            className="max-w-max dark:text-gray-100 text-green-900 font-medium truncate"
            href={data.songUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {data.name}
          </a>
        ) : (
          <p className="dark:text-gray-200 text-gray-800 font-medium">
            Not Playing
          </p>
        )}
        <span className="hidden mx-2 dark:text-gray-300 text-gray-600 sm:block">
          {" – "}
        </span>
        <p className="max-w-max dark:text-gray-300 text-gray-700 truncate">
          {data?.artist ?? "Spotify"}
        </p>
      </div>
    </div>
  );
};

export default NowPlaying;
