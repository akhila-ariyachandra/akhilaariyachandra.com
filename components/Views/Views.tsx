"use client";

import { type Post } from "@/db/schema";
import { useEffect } from "react";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";

type ViewsProps = {
  slug: string;
  incrementOnMount?: boolean;
};

const Views = ({ slug, incrementOnMount = false }: ViewsProps) => {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["views", slug],
    queryFn: () =>
      fetch(`/api/views/${slug}`, { cache: "no-cache" }).then(
        (res) => res.json() as Promise<Post>,
      ),
    placeholderData: {
      slug,
      views: 0,
    },
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/views/${slug}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      });
      const data = (await response.json()) as Post;

      if (!response.ok) {
        throw new Error("Error incrementing post views");
      }

      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["views", slug], data);
    },
  });

  useEffect(() => {
    if (incrementOnMount) {
      mutation.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <span>{`${data?.views} views`}</span>;
};

export default Views;
