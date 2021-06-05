import { useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetcher } from "@/lib/helpers";

const useHits = (id: string) => {
  const QUERY_KEY = ["pageHits", id];

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

  const increment = useCallback(() => {
    mutation.mutate();
  }, [id]);

  return { hits, increment };
};

export default useHits;
