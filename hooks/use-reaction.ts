import splitbee from "@/lib/splitbee";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useReaction = (id: string) => {
  const QUERY_KEY = ["reaction", id];

  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    data: { count, total },
  } = useQuery(
    QUERY_KEY,
    () => fetch(`/api/reaction/${id}`).then((response) => response.json()),
    {
      initialData: {
        count: 0,
      },
    }
  );

  const mutation = useMutation(
    (increment: number) =>
      fetch(`/api/reaction/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ increment }),
      }).then((response) => response.json()),
    {
      onMutate: async (increment: number) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries(QUERY_KEY);

        // Snapshot the previous value
        const previousReaction = queryClient.getQueryData(QUERY_KEY);

        // Optimistically update to the new value
        queryClient.setQueryData(QUERY_KEY, ({ count, total }) => ({
          count: count + increment,
          total: total + increment,
        }));

        // Return a context object with the snapshotted value
        return { previousReaction };
      },
      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (err, newReaction, context) => {
        queryClient.setQueryData(QUERY_KEY, context.previousReaction);
        // Refetch after error
        queryClient.invalidateQueries(QUERY_KEY);
      },
      onSuccess: ({ count, total }, increment) => {
        // Set new query data with result from mutation without refetching
        queryClient.setQueryData(QUERY_KEY, { count, total });

        // Record event in Splitbee
        splitbee.track("React", {
          slug: router.asPath.split("?")[0],
          increment,
        });
      },
    }
  );

  return {
    count,
    total,
    react: mutation.mutate,
  };
};

export default useReaction;
