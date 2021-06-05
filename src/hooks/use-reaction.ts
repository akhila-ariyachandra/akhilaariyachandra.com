import splitbee from "@/lib/splitbee";
import { useContext, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/router";
import { UniqueIdContext } from "@/context/UniqueIdContext";

const useReaction = (id: string, type: string) => {
  const QUERY_KEY = ["reaction", id, type];

  const uid = useContext(UniqueIdContext);
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    data: { count, reacted },
  } = useQuery(
    QUERY_KEY,
    () =>
      fetch(`/api/reaction/${id}/${type}`, {
        headers: { uid },
      }).then((response) => response.json()),
    {
      initialData: {
        count: 0,
        reacted: false,
      },
      enabled: !!uid,
    }
  );

  const mutation = useMutation(
    () =>
      fetch(`/api/reaction/${id}/${type}`, {
        method: "POST",
        headers: { uid },
      }).then((response) => response.json()),
    {
      onMutate: async () => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries(QUERY_KEY);

        // Snapshot the previous value
        const previousReaction = queryClient.getQueryData(QUERY_KEY);

        // Optimistically update to the new value
        queryClient.setQueryData(QUERY_KEY, ({ count, reacted }) => ({
          count: reacted ? count - 1 : count + 1,
          reacted: !reacted,
        }));

        // Return a context object with the snapshotted value
        return { previousReaction };
      },
      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (err, newReaction, context) => {
        queryClient.setQueryData(QUERY_KEY, context.previousReaction);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(QUERY_KEY);
      },
      onSuccess: ({ message }) => {
        splitbee.track(message, {
          slug: router.asPath,
          type,
        });
      },
    }
  );

  const react = useCallback(() => {
    mutation.mutate();
  }, [id, type]);

  return {
    count,
    reacted,
    react,
  };
};

export default useReaction;
