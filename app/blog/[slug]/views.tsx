"use client";

import ky from "ky";
import ViewsCounter from "@/components/ViewsCounter/ViewsCounter";
import type { View } from "@/lib/types";
import { type FC, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface BlogPostViewsProps {
  slug: string;
}

const BlogPostViews: FC<BlogPostViewsProps> = ({ slug }) => {
  const queryClient = useQueryClient();

  const queryKey = ["views", slug];

  const mutation = useMutation({
    mutationFn: () => ky.post(`/views/${slug}`).json<View>(),
    onMutate: async () => {
      await queryClient.cancelQueries(queryKey);
    },
    onSuccess: (data) => {
      // Set Query data from the POST response without making another GET request
      queryClient.setQueryData(queryKey, data);
    },
    onError: async () => {
      // Refetch query if there is an error
      await queryClient.invalidateQueries(queryKey);
    },
  });

  useEffect(() => {
    // Will run twice in development mode due to React Strict mode
    mutation.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <p>
      <ViewsCounter slug={slug} />
      {` views`}
    </p>
  );
};

export default BlogPostViews;
