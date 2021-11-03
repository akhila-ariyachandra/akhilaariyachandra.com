import querystring from "querystring";
import axios, { AxiosResponse } from "axios";

const {
  SPOTIFY_CLIENT_ID: client_id,
  SPOTIFY_CLIENT_SECRET: client_secret,
  SPOTIFY_REFRESH_TOKEN: refresh_token,
} = process.env;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

type AccessToken = {
  access_token: string;
};

const getAccessToken = async (): Promise<AccessToken> => {
  try {
    const response = await axios.request<AccessToken>({
      url: TOKEN_ENDPOINT,
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: querystring.stringify({
        grant_type: "refresh_token",
        refresh_token,
      }),
    });

    return response.data;
  } catch (error) {
    console.log("> getAccessToken error: ", error);
  }
};

type Song = {
  is_playing: boolean;
  item: {
    name: string;
    artists: {
      name: string;
    }[];
    album: {
      name: string;
      images: {
        url: string;
      }[];
    };
    external_urls: {
      spotify: string;
    };
  };
};

export const getNowPlaying = async (): Promise<AxiosResponse<Song>> => {
  try {
    const { access_token } = await getAccessToken();

    const response = await axios.request<Song>({
      url: NOW_PLAYING_ENDPOINT,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return response;
  } catch (error) {
    console.log("> getNowPlaying error: ", error);
  }
};

type TopTracks = {
  items: {
    name: string;
    artists: {
      name;
    }[];
    album: {
      name: string;
      images: { url: string }[];
    };
    external_urls: {
      spotify: string;
    };
  }[];
};

export const getTopTracks = async (): Promise<AxiosResponse<TopTracks>> => {
  try {
    const { access_token } = await getAccessToken();

    const response = await axios.request<TopTracks>({
      url: TOP_TRACKS_ENDPOINT,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        limit: 10,
      },
    });

    return response;
  } catch (error) {
    console.log("> access_token error: ", error);
  }
};
