import React from "react";
import { useQuery } from "react-query";
import { graphQLClient, gql } from "@/lib/api";
import { FaSpotify } from "react-icons/fa";

const NowPlaying: React.FunctionComponent = () => {
  const {
    data: { nowPlaying },
  } = useQuery(
    "nowPlaying",
    () =>
      graphQLClient.request(gql`
        query NowPlaying {
          nowPlaying {
            name
            artist
            album
            songUrl
          }
        }
      `),
    {
      placeholderData: { nowPlaying: null },
    }
  );

  return (
    <div className="flex flex-row-reverse items-center w-full text-lg antialiased space-x-0 sm:flex-row sm:space-x-2">
      <FaSpotify color="#1DB954" />

      <div className="inline-flex flex-col w-full max-w-full truncate sm:flex-row">
        {nowPlaying?.songUrl ? (
          <a
            className="max-w-max dark:text-gray-100 text-green-900 font-medium truncate"
            href={nowPlaying.songUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {nowPlaying.name}
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
          {nowPlaying?.artist ?? "Spotify"}
        </p>
      </div>
    </div>
  );
};

export default NowPlaying;
