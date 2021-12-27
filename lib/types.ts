export type Job = {
  company?: string;
  image?: string;
  link?: string;
  overallPeriod?: {
    startDate: string;
    endDate?: string;
  };
  positions?: [
    {
      title: string;
      startDate: string;
      endDate?: string;
    }
  ];
};

export type Song = {
  isPlaying?: boolean;
  name: string;
  artist: string;
  album: string;
  albumImage: string;
  songUrl: string;
};

export type DEVArticle = {
  page_views_count: number;
  public_reactions_count: number;
};
