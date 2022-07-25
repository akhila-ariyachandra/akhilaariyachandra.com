import type { Views } from "@/prisma";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/lib/helpers";

const useViews = (slug: string) => {
  const KEY = ["pageViews", slug];
  const queryClient = useQueryClient();

  const { data } = useQuery<Views>(KEY, () => fetcher(`/api/views/${slug}`), {
    placeholderData: { count: 0, slug },
  });

  const mutation = useMutation(
    () =>
      fetch(`/api/views/${slug}`, { method: "POST" }).then((res) => res.json()),
    {
      mutationKey: [...KEY, "increment"],
      onSettled: async () => {
        await queryClient.invalidateQueries(KEY);
      },
    }
  );

  return { count: data?.count ?? 0, increment: mutation.mutate };
};

export default useViews;
