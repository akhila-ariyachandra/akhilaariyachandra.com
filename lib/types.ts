export interface View {
  slug: string;
  count: number;
}

export type Song = {
  isPlaying?: boolean;
  name: string;
  artist: string;
  album: string;
  albumImage: string;
  songUrl: string;
};
