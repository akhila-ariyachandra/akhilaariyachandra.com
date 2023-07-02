import Image from "next/image";
import type { Song } from "@/lib/types";
import { getTopTracks } from "@/lib/spotify";

const getTopTenTracks = async () => {
  const { items } = await getTopTracks();
  const tracks: Song[] = [];
  const length = items?.length >= 10 ? 10 : items?.length;
  for (let index = 0; index < length; index++) {
    const track = items[index];

    tracks.push({
      name: track.name,
      artist: track.artists.map((_artist) => _artist.name).join(", "),
      album: track.album.name,
      albumImage: track.album.images[0].url,
      songUrl: track.external_urls.spotify,
    });
  }

  return tracks;
};

/**
 * https://gist.github.com/cramforce/b5e3f0b103f841d2e5e429b1d5ac4ded
 */
function asyncComponent<T, R>(fn: (arg: T) => Promise<R>): (arg: T) => R {
  return fn as (arg: T) => R;
}

const TopTracks = asyncComponent(async () => {
  const tracks = await getTopTenTracks();

  return (
    <div className="my-10">
      <h2 className="mt-6 font-display text-2xl font-semibold text-zinc-800 dark:text-zinc-200 sm:text-3xl">
        Top Tracks
      </h2>

      <p className="mb-6 mt-4 text-base text-zinc-500 dark:text-zinc-300 sm:text-lg">
        Interested to know what I&apos;m listening to? Here are my top tracks in
        Spotify updated daily.
      </p>

      <div className="flex flex-col space-y-3 divide-y divide-zinc-200 dark:divide-zinc-600">
        {tracks.map((track, index) => (
          <div
            key={`top-track-${index}`}
            className="flex flex-row items-center space-x-6 pt-3"
          >
            <Image
              src={track.albumImage}
              width={80}
              height={80}
              alt={track.album}
              title={track.album}
              className="flex-shrink-0 rounded-sm"
            />

            <div className="truncate">
              <a
                href={track.songUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate font-display text-base font-medium text-emerald-700 dark:text-emerald-600 sm:text-lg"
              >
                {track.name}
              </a>

              <p className="truncate text-sm text-zinc-500 dark:text-zinc-300 sm:text-base">
                {track.artist}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default TopTracks;
