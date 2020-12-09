type Post = {
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
  content?: string;
};

type Job = {
  company?: string;
  image?: string;
  link?: string;
  overallPeriod?: string;
  positions?: [
    {
      title: string;
      period: string;
    }
  ];
};

export type { Post, Job };
