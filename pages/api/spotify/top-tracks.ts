import type { NextApiHandler } from "next";
import { getTopTracks } from "@/lib/spotify";

const TopTracks: NextApiHandler = async (_, res) => {
  const response = await getTopTracks();
  const { items } = response.data;

  const tracks = items.slice(0, 10).map((track) => ({
    artist: track.artists.map((_artist) => _artist.name).join(", "),
    songUrl: track.external_urls.spotify,
    title: track.name,
    image: track.album.images[0].url,
    albumTitle: track.album.name,
  }));

  // Cache for one day
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");

  return res.status(200).json({ tracks });
};

export default TopTracks;
