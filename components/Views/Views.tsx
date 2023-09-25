"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import ky from "ky";
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
    mutationFn: () => ky.post(`/api/posts/${slug}/views`).json<PostsResponse>(),
    onSuccess: (data) => {
      queryClient.setQueryData(["post", slug], data);
      queryClient.refetchQueries(["posts"]);
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
