import type { NextApiHandler } from "next";
import { getTopTracks } from "@/lib/spotify";

const TopTracks: NextApiHandler = async (req, res) => {
  const response = await getTopTracks();
  const { items } = response.data;

  const tracks = items.slice(0, 10).map((track) => ({
    name: track.name,
    artist: track.artists.map((_artist) => _artist.name).join(", "),
    album: track.album.name,
    albumImage: track.album.images[0].url,
    songUrl: track.external_urls.spotify,
  }));

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=43200"
  );

  return res.status(200).send(tracks);
};

export default TopTracks;
