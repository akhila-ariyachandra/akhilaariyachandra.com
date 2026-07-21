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
  "use cache";

  cacheLife("minutes");

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
