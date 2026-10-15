import { createFetch } from "@better-fetch/fetch";
import { cacheLife } from "next/cache";
import "server-only";
import { ENV } from "varlock/env";
import { recentTracksSchema, topTracksSchema, trackInfoSchema } from "./schema";

const $fetch = createFetch({
  baseURL: "https://ws.audioscrobbler.com/2.0",
  throw: true,
  query: {
    api_key: ENV.LAST_FM_API_KEY,
    user: ENV.LAST_FM_USER,
    format: "json",
  },
});

export const getTopTracks = async () => {
  "use cache";

  cacheLife("days");

  const data = await $fetch("", {
    query: {
      method: "user.gettoptracks",
      limit: "10",
      period: "7day",
    },
    output: topTracksSchema,
  });

  return data.toptracks.track;
};

export const getRecentTracks = async () => {
  const data = await $fetch("", {
    query: {
      method: "user.getRecentTracks",
      limit: "10",
    },
    output: recentTracksSchema,
  });

  return data.recenttracks.track;
};

export const getTrackInfo = async (mbid: string) => {
  "use cache";

  cacheLife("max");

  const data = await $fetch("", {
    query: {
      method: "track.getInfo",
      mbid,
    },
    output: trackInfoSchema,
  });

  return data.track;
};
