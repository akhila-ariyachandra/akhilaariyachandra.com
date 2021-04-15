import { MdxRemote } from "next-mdx-remote/types";

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
  content?: MdxRemote.Source;
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
  content?: MdxRemote.Source;
};

export enum ReactionType {
  PlusOne = "PlusOne",
  MinusOne = "MinusOne",
  Laugh = "Laugh",
  Hooray = "Hooray",
  Confused = "Confused",
  Heart = "Heart",
  Rocket = "Rocket",
  Eyes = "Eyes",
}

export type Comment = {
  id: string;
  comment: string;
  timestamp: Date;
  user: {
    uid: string;
    displayName: string;
    photoURL: string;
  };
};
