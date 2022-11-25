"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface View {
  slug: string;
  count: number;
}

const useViews = (slug: string) => {
  const KEY = ["views", slug];
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: KEY,
    queryFn: () =>
      fetch(`/api/views/${slug}`).then((res) => res.json() as Promise<View>),
    placeholderData: {
      slug,
      count: 0,
    },
  });

  const mutation = useMutation(
    (): Promise<View> =>
      fetch(`/api/views/${slug}`, { method: "POST" }).then((res) => res.json()),
    {
      onMutate: async () => {
        await queryClient.cancelQueries(KEY);
      },
      onSuccess: (data) => {
        // Set Query data from the POST response without making another GET request
        queryClient.setQueryData(KEY, data);
      },
      onError: async () => {
        // Refetch query if there is an error
        await queryClient.invalidateQueries(KEY);
      },
    }
  );

  return {
    count: data?.count,
    increment: mutation.mutate,
  };
};

export default useViews;
