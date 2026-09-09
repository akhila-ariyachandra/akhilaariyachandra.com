import ky from "ky";
import { cacheLife } from "next/cache";
import "server-only";
import { recentTracksSchema, topTracksSchema, trackInfoSchema } from "./schema";

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
        period: "1month",
      },
    })
    .json();

  const tracks = await topTracksSchema.parseAsync(response);

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

  const tracks = await recentTracksSchema.parseAsync(response);

  return tracks.recenttracks.track;
};

export const getTrackInfo = async (mbid: string) => {
  "use cache";

  cacheLife("max");

  const response = await api
    .get("", {
      searchParams: {
        method: "track.getInfo",
        mbid,
      },
    })
    .json();

  const parsedResponse = await trackInfoSchema.parseAsync(response);

  return parsedResponse.track;
};
