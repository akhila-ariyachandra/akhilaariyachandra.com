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

interface SanityDocument {
  _createdAt: Date;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: Date;
}

interface SanityMedia {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
}

interface Employer extends SanityDocument {
  name: string;
  link: string;
  logo: SanityMedia;
}

export interface Job extends SanityDocument {
  position: string;
  period: {
    start: Date;
    end?: Date;
  };
  company: Employer;
}
