import { getNowPlaying } from "@/lib/spotify";
import type { NextApiHandler } from "next";

const NowPlaying: NextApiHandler = async (req, res) => {
  const response = await getNowPlaying();

  if (
    response.status === 204 ||
    response.status > 400 ||
    response?.data?.item === null
  ) {
    return res.status(200).json({ isPlaying: false });
  }

  const song = response.data;

  // Don't show song if it is paused
  if (song.is_playing === false) {
    return res.status(200).json({ isPlaying: false });
  }

  const isPlaying = song.is_playing;
  const name = song.item.name;
  const artist = song.item.artists.map((_artist) => _artist.name).join(", ");
  const album = song.item.album.name;
  const albumImage = song.item.album.images[0].url;
  const songUrl = song.item.external_urls.spotify;

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=30"
  );

  return res.status(200).json({
    isPlaying,
    name,
    artist,
    album,
    albumImage,
    songUrl,
  });
};

export default NowPlaying;
