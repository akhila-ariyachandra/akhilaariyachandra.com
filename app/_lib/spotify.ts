import ky from "ky";
import { cacheLife } from "next/cache";
import "server-only";
import { z } from "zod";
import { nowPlayingSchema } from "./helpers";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

if (!client_id || !client_secret || !refresh_token) {
  throw new Error("Missing required Spotify environment variables");
}

const basic = btoa(`${client_id}:${client_secret}`);
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
  const response = await ky
    .post(TOKEN_ENDPOINT, {
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token,
      }),
    })
    .json();

  return z
    .object({
      access_token: z.string(),
      token_type: z.literal("Bearer"),
      expires_in: z.number(),
      refresh_token: z.string().optional(),
      scope: z.string(),
    })
    .parseAsync(response);
};

export const getNowPlaying = async () => {
  const { access_token } = await getAccessToken();

  const response = await ky
    .get(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    .json();

  return await nowPlayingSchema.parseAsync(response);
};

export const getTopTracks = async () => {
  "use cache";

  cacheLife("days");

  const { access_token } = await getAccessToken();

  const response = await ky
    .get(TOP_TRACKS_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      searchParams: new URLSearchParams({
        time_range: "short_term",
        limit: "10",
      }),
    })
    .json();

  return await z
    .object({
      items: z.array(
        z.object({
          album: z.object({
            external_urls: z.object({ spotify: z.string() }),
            images: z.array(
              z.object({
                url: z.string(),
                height: z.number(),
                width: z.number(),
              }),
            ),
          }),
          artists: z.array(
            z.object({
              name: z.string(),
            }),
          ),
          name: z.string(),
          id: z.string(),
          external_urls: z.object({ spotify: z.string() }),
        }),
      ),
    })
    .parseAsync(response);
};
