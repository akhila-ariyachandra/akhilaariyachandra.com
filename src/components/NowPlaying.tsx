import React from "react";
import { fetcher } from "@/lib/helpers";
import { useQuery } from "react-query";
import { FaSpotify } from "react-icons/fa";

const NowPlaying: React.FunctionComponent = () => {
  const { data } = useQuery("nowPlaying", () =>
    fetcher("/api/spotify/now-playing")
  );

  return (
    <div className="flex flex-row-reverse items-center w-full text-lg antialiased space-x-0 sm:flex-row sm:space-x-2">
      <FaSpotify color="#1DB954" />

      <div className="inline-flex flex-col w-full max-w-full truncate sm:flex-row">
        {data?.songUrl ? (
          <a
            className="max-w-max dark:text-green-600 text-green-700 font-medium truncate"
            href={data.songUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {data.title}
          </a>
        ) : (
          <p className="dark:text-gray-200 text-gray-800 font-medium">
            Not Playing
          </p>
        )}
        <span className="hidden mx-2 dark:text-gray-300 text-gray-500 sm:block">
          {" – "}
        </span>
        <p className="max-w-max dark:text-gray-300 text-gray-500 truncate">
          {data?.artist ?? "Spotify"}
        </p>
      </div>
    </div>
  );
};

export default NowPlaying;
