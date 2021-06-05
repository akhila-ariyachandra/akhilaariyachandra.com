import type { NextApiHandler } from "next";
import { getNowPlaying } from "@/lib/spotify";

const NowPlaying: NextApiHandler = async (req, res) => {
  const response = await getNowPlaying();

  if (response.status === 204 || response.status > 400) {
    return null;
  }

  const song = response.data;

  const name = song.item.name;
  const artist = song.item.artists.map((_artist) => _artist.name).join(", ");
  const album = song.item.album.name;
  const albumImage = song.item.album.images[0].url;
  const songUrl = song.item.external_urls.spotify;

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=30"
  );

  return res.status(200).send({ name, artist, album, albumImage, songUrl });
};

export default NowPlaying;
