import { objectType, extendType } from "nexus";
import { getNowPlaying, getTopTracks } from "@/lib/spotify";
import "apollo-cache-control";

export const Song = objectType({
  name: "Song",
  definition: (t) => {
    t.nonNull.string("name");
    t.nonNull.string("artist");
    t.nonNull.string("album");
    t.nonNull.string("albumImage");
    t.nonNull.string("songUrl");
  },
});

export const SpotifyQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.field("nowPlaying", {
      type: "Song",
      resolve: async (_root, _args, { res }, info) => {
        const response = await getNowPlaying();

        if (response.status === 204 || response.status > 400) {
          return null;
        }

        const song = response.data;

        const name = song.item.name;
        const artist = song.item.artists
          .map((_artist) => _artist.name)
          .join(", ");
        const album = song.item.album.name;
        const albumImage = song.item.album.images[0].url;
        const songUrl = song.item.external_urls.spotify;

        // Cache the response
        info.cacheControl.setCacheHint({ maxAge: 60 });

        return {
          name,
          artist,
          album,
          albumImage,
          songUrl,
        };
      },
    });

    t.nonNull.list.field("topTracks", {
      type: "Song",
      resolve: async (_root, _args, { res }, info) => {
        const response = await getTopTracks();
        const { items } = response.data;

        const tracks = items.slice(0, 10).map((track) => ({
          name: track.name,
          artist: track.artists.map((_artist) => _artist.name).join(", "),
          album: track.album.name,
          albumImage: track.album.images[0].url,
          songUrl: track.external_urls.spotify,
        }));

        // Cache the response
        info.cacheControl.setCacheHint({ maxAge: 86400 });

        return tracks;
      },
    });
  },
});
