import type { PostsSelectModel } from "@/db/schema";

export type PostsResponse = PostsSelectModel & {
  userVotes: number;
};

export type PostsTotalResponse = {
  views: number;
  upvotes: number;
};
