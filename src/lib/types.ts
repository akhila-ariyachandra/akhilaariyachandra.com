export type Post = {
  id: string;
  title: string;
  date: string;
  formattedDate?: string;
  updated?: string;
  formattedUpdated?: string;
  description?: string;
  banner?: string;
  photographer?: string;
  unsplash_link?: string;
  content?: any;
  readingTime?: string;
};

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

export type Snippet = {
  id: string;
  title: string;
  description: string;
  content?: any;
};

export type Song = {
  isPlaying: boolean;
  name: string;
  artist: string;
  album: string;
  albumImage: string;
  songUrl: string;
};
