import type { NextApiHandler } from "next";
import type { Song } from "@/lib/types";
import { getTopTracks } from "@/lib/spotify";

const TopTracks: NextApiHandler = async (req, res) => {
  const response = await getTopTracks();
  const { items } = response.data;

  const tracks: Song[] = [];
  const length = items.length >= 10 ? 10 : items.length;

  for (let index = 0; index < length; index++) {
    const track = items[index];

    tracks.push({
      name: track.name,
      artist: track.artists.map((_artist) => _artist.name).join(", "),
      album: track.album.name,
      albumImage: track.album.images[0].url,
      songUrl: track.external_urls.spotify,
    });
  }

  return res.status(200).send(tracks);
};

export default TopTracks;
