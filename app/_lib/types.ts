import { type } from "arktype";

export const TopTracks = type({
  toptracks: {
    track: type({
      mbid: "string",
      name: "string",
      image: [
        {
          size: "'small'",
          "#text": "string",
        },
        {
          size: "'medium'",
          "#text": "string",
        },
        {
          size: "'large'",
          "#text": "string",
        },
        {
          size: "'extralarge'",
          "#text": "string",
        },
      ],
      artist: {
        url: "string",
        name: "string",
        mbid: "string",
      },
      url: "string",
    }).array(),
  },
});

export const RecentTracks = type({
  recenttracks: {
    track: type({
      mbid: "string",
      name: "string",
      image: [
        {
          size: "'small'",
          "#text": "string",
        },
        {
          size: "'medium'",
          "#text": "string",
        },
        {
          size: "'large'",
          "#text": "string",
        },
        {
          size: "'extralarge'",
          "#text": "string",
        },
      ],
      artist: {
        "#text": "string",
        mbid: "string",
      },
      album: {
        "#text": "string",
        mbid: "string",
      },
      url: "string",
      "@attr?": {
        nowplaying: "'true' | 'false'",
      },
    }).array(),
  },
});

export type RecentTracksType = typeof RecentTracks.infer;
