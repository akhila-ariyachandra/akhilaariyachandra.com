import { z } from "zod";

const lastFmImageSchema = z.tuple([
  z.object({
    size: z.literal("small"),
    "#text": z.string(),
  }),
  z.object({
    size: z.literal("medium"),
    "#text": z.string(),
  }),
  z.object({
    size: z.literal("large"),
    "#text": z.string(),
  }),
  z.object({
    size: z.literal("extralarge"),
    "#text": z.string(),
  }),
]);

const topTrackSchema = z.object({
  mbid: z.string(),
  name: z.string(),
  image: lastFmImageSchema,
  artist: z.object({
    url: z.string(),
    name: z.string(),
    mbid: z.string(),
  }),
  url: z.string(),
});

export const topTracksSchema = z.object({
  toptracks: z.object({
    track: z.array(topTrackSchema),
  }),
});

const recentTrackSchema = z.object({
  mbid: z.string(),
  name: z.string(),
  image: lastFmImageSchema,
  artist: z.object({
    "#text": z.string(),
    mbid: z.string(),
  }),
  album: z.object({
    "#text": z.string(),
    mbid: z.string(),
  }),
  url: z.string(),
  "@attr": z
    .object({
      nowplaying: z.enum(["true", "false"]),
    })
    .optional(),
});

export const recentTracksSchema = z.object({
  recenttracks: z.object({
    track: z.array(recentTrackSchema),
  }),
});

export const albumArtSearchSchema = z.object({
  resultCount: z.literal(1),
  results: z.tuple([
    z.object({
      artworkUrl100: z.string(),
    }),
  ]),
});

export type RecentTrack = z.infer<typeof recentTrackSchema>;
