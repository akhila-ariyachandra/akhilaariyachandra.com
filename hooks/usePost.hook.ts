"use client";

import { useQuery } from "@tanstack/react-query";

import type { PostsResponse } from "@/lib/types";

const usePost = (slug: string) => {
  return useQuery({
    queryKey: ["post", slug],
    queryFn: async () => {
      const response = await fetch(`/api/posts/${slug}`);

      if (!response.ok) {
        throw new Error("Error fetching views");
      }

      return (await response.json()) as PostsResponse;
    },
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
