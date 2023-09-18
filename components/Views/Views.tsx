"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import type { PostsSelectModel } from "@/db/schema";

type ViewsProps = {
  slug: string;
  incrementOnMount?: boolean;
};

const Views = ({ slug, incrementOnMount = false }: ViewsProps) => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["views", slug],
    queryFn: async () => {
      const response = await fetch(`/api/views/${slug}`, {
        cache: "no-cache",
      });

      if (!response.ok) {
        throw new Error("Error fetching views");
      }

      return (await response.json()) as PostsSelectModel;
    },
    placeholderData: {
      slug,
      views: 0,
    },
  });

  const incrementMutation = useMutation({
    mutationKey: ["views", slug, "increment"],
    mutationFn: async () => {
      const response = await fetch(`/api/views/${slug}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      });

      if (!response.ok) {
        throw new Error("Error fetching views");
      }

      return (await response.json()) as PostsSelectModel;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["views", slug], data);
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
