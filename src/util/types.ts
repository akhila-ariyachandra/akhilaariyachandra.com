export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: [string];
  banner: Banner;
  content: string;
  readingTime?: string;
};

type Banner = {
  title: string;
  file: {
    url: string;
    details: object;
  };
};
