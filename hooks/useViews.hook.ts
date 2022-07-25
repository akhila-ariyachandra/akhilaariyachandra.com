import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/lib/helpers";

const useViews = (slug: string) => {
  const key = ["pageViews", slug];
  const queryClient = useQueryClient();

  const { data } = useQuery<{ views: number }>(
    key,
    () => fetcher(`/api/views/${slug}`),
    { placeholderData: { views: 0 } }
  );

  const incrementMutation = useMutation(
    () =>
      fetch(`/api/views/${slug}`, { method: "POST" }).then((response) =>
        response.json()
      ),
    {
      onSettled: () => {
        queryClient.invalidateQueries(key);
      },
    }
  );

  return { views: data?.views, increment: incrementMutation.mutate };
};

export default useViews;
