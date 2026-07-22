import { type } from "arktype";
import ky from "ky";
import { cacheLife } from "next/cache";
import "server-only";
import { RecentTracks, TopTracks } from "./types";

const api = ky.create({
  baseUrl: "https://ws.audioscrobbler.com/2.0",
  searchParams: {
    api_key: process.env.LAST_FM_API_KEY,
    user: process.env.LAST_FM_USER,
    format: "json",
  },
});

export const getTopTracks = async () => {
  "use cache";

  cacheLife("days");

  const response = await api
    .get("", {
      searchParams: {
        method: "user.gettoptracks",
        limit: "10",
        period: "7day",
      },
    })
    .json();

  const tracks = TopTracks(response);

  if (tracks instanceof type.errors) {
    throw new Error("Invalid response from Last.fm");
  }

  return tracks.toptracks.track;
};

export const getRecentTracks = async () => {
  const response = await api
    .get("", {
      searchParams: {
        method: "user.getRecentTracks",
        limit: "10",
      },
    })
    .json();

  const tracks = RecentTracks(response);

  if (tracks instanceof type.errors) {
    throw new Error("Invalid response from Last.fm");
  }

  return tracks.recenttracks.track;
};

/**
 * Last.fm doesn't return the album art for tracks so we're using the iTunes Search API to get it
 */
export const getAlbumArt = async (name: string, artist: string) => {
  "use cache";

  cacheLife("max");

  const response = await ky
    .get("https://itunes.apple.com/search", {
      searchParams: {
        term: `${name} ${artist}`,
        media: "music",
        entity: "song",
        limit: "1",
      },
    })
    .json();

  const song = type({
    resultCount: "1",
    results: [
      {
        artworkUrl100: "string",
      },
    ],
  })(response);

  if (song instanceof type.errors) {
    return undefined;
  }

  return song.results[0].artworkUrl100;
};
