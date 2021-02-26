import querystring from "querystring";
import axios from "axios";

const {
  SPOTIFY_CLIENT_ID: client_id,
  SPOTIFY_CLIENT_SECRET: client_secret,
  SPOTIFY_REFRESH_TOKEN: refresh_token,
} = process.env;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
  try {
    const response = await axios.request({
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

export const getNowPlaying = async () => {
  try {
    const { access_token } = await getAccessToken();

    const response = await axios.request({
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

export const getTopTracks = async () => {
  try {
    const { access_token } = await getAccessToken();

    const response = await axios.request({
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
