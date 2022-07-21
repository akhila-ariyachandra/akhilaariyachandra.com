import { getPageHitsKey } from "@/lib/constants";
import { fetcher } from "@/lib/helpers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useHits = (id: string) => {
  const QUERY_KEY = getPageHitsKey(id);

  const queryClient = useQueryClient();

  const { data: hits } = useQuery<number, Error>(
    QUERY_KEY,
    () => fetcher(`/api/hit/${id}`),
    {
      placeholderData: 0,
    }
  );

  const mutation = useMutation(
    () =>
      fetch(`/api/hit/${id}`, { method: "POST" }).then((response) =>
        response.json()
      ),
    {
      onSettled: () => {
        queryClient.invalidateQueries(QUERY_KEY);
      },
    }
  );

  return { hits: hits ?? 0, increment: mutation.mutate };
};

export default useHits;
