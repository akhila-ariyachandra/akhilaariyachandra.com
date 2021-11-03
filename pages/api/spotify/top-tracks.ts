import type { NextApiHandler } from "next";
import type { Song } from "@/lib/types";
import { getPlaiceholder } from "plaiceholder";
import { getTopTracks } from "@/lib/spotify";

const TopTracks: NextApiHandler = async (req, res) => {
  const response = await getTopTracks();
  const { items } = response.data;

  const tracks: Song[] = [];
  const length = items.length >= 10 ? 10 : items.length;

  for (let index = 0; index < length; index++) {
    const track = items[index];

    const { base64 } = await getPlaiceholder(track.album.images[0].url);

    tracks.push({
      name: track.name,
      artist: track.artists.map((_artist) => _artist.name).join(", "),
      album: track.album.name,
      albumImage: track.album.images[0].url,
      blurAlbumImage: base64,
      songUrl: track.external_urls.spotify,
    });
  }

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=43200"
  );

  return res.status(200).send(tracks);
};

export default TopTracks;
