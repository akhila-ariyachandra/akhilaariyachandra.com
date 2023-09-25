"use client";

import { useQuery } from "@tanstack/react-query";
import ky from "ky";

import type { PostsResponse } from "@/lib/types";

const usePost = (slug: string) => {
  return useQuery({
    queryKey: ["post", slug],
    queryFn: () => ky(`/api/posts/${slug}`).json<PostsResponse>(),
    placeholderData: {
      slug,
      views: 0,
      upvotes: 0,
      userVotes: 0,
    },
    enabled: !!slug,
  });
};

export default usePost;
