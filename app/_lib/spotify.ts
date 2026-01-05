import { type } from "arktype";
import ky from "ky";
import { cacheLife } from "next/cache";
import "server-only";
import { NowPlaying } from "./helpers";

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

const AccessToken = type({
  access_token: "string",
  token_type: "'Bearer'",
  expires_in: "number",
  "refresh_token?": "string",
  scope: "string",
});

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

  const accessToken = AccessToken(response);

  if (accessToken instanceof type.errors) {
    throw new Error("Failed to parse access token response");
  } else {
    return accessToken;
  }
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

  const nowPlaying = NowPlaying(response);

  if (nowPlaying instanceof type.errors) {
    throw new Error("Failed to parse now playing response");
  } else {
    return nowPlaying;
  }
};

const TopTracks = type({
  items: type({
    album: {
      external_urls: {
        spotify: "string",
      },
      images: type({
        url: "string",
        height: "number",
        width: "number",
      }).array(),
      name: "string",
    },
    artists: type({
      name: "string",
    }).array(),
    name: "string",
    id: "string",
    external_urls: {
      spotify: "string",
    },
  }).array(),
});

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

  const topTracks = TopTracks(response);

  if (topTracks instanceof type.errors) {
    throw new Error("Failed to parse top tracks response");
  } else {
    return topTracks;
  }
};
