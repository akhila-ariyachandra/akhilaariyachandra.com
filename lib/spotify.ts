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

const getAccessToken = async (revalidate = 1) => {
  const searchParams = new URLSearchParams();
  searchParams.append("grant_type", "refresh_token");
  searchParams.append("refresh_token", refresh_token as string);

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: searchParams.toString(),
    next: {
      revalidate,
    },
  });

  const accessToken = (await response.json()) as AccessToken;

  return accessToken;
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

export const getNowPlaying = async () => {
  const { access_token } = await getAccessToken();

  const response = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    next: {
      revalidate: 60000,
    },
  });

  const song = (await response.json()) as Song;

  return {
    status: response.status,
    data: song,
  };
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

export const getTopTracks = async (revalidate = 1) => {
  const { access_token } = await getAccessToken(revalidate);

  const response = await fetch(`${TOP_TRACKS_ENDPOINT}?limit=10`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    next: {
      revalidate,
    },
  });

  const tracks = (await response.json()) as TopTracks;

  return tracks;
};
