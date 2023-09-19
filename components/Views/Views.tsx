"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import usePost from "@/hooks/usePost.hook";
import type { PostsResponse } from "@/lib/types";

type ViewsProps = {
  slug: string;
  incrementOnMount?: boolean;
};

const Views = ({ slug, incrementOnMount = false }: ViewsProps) => {
  const queryClient = useQueryClient();

  const { data } = usePost(slug);

  const incrementMutation = useMutation({
    mutationKey: ["views", slug, "increment"],
    mutationFn: async () => {
      const response = await fetch(`/api/posts/${slug}/views`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error incrementing views");
      }

      return (await response.json()) as PostsResponse;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["post", slug], data);
    },
  });

  useEffect(() => {
    if (incrementOnMount) {
      incrementMutation.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <span>{`${data?.views} views`}</span>;
};

export default Views;
