import Image from "next/image";
import { FC } from "react";
import { useQuery } from "react-query";
import { graphQLClient, gql } from "@/lib/api";

const TopTracks: FC = () => {
  const {
    data: { topTracks },
  } = useQuery(
    "topTracks",
    () =>
      graphQLClient.request(gql`
        query TopTracks {
          topTracks {
            name
            artist
            album
            albumImage
            songUrl
          }
        }
      `),
    {
      placeholderData: { topTracks: [] },
    }
  );

  return (
    <div className="my-4 p-4">
      <h2 className="mt-6 dark:text-gray-200 text-gray-800 text-3xl font-semibold">
        Top Tracks
      </h2>

      <p className="mb-10 mt-4 dark:text-gray-300 text-gray-500 text-lg">
        Interested to know what I'm listening to? Here are my top tracks in
        Spotify updated daily.
      </p>

      <div className="flex flex-col divide-gray-200 dark:divide-gray-600 divide-y space-y-3">
        {topTracks.map((track, index) => (
          <div
            key={index}
            className="flex flex-row items-center pt-3 space-x-6"
          >
            <div className="flex-shrink-0 w-20 h-20 rounded-sm overflow-hidden">
              <Image
                src={track.albumImage}
                width={640}
                height={640}
                alt={track.album}
                title={track.album}
              />
            </div>

            <div className="truncate">
              <a
                href={track.songUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="dark:text-green-600 text-green-700 text-lg font-medium truncate"
              >
                {track.name}
              </a>

              <p className="dark:text-gray-300 text-gray-500 truncate">
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
