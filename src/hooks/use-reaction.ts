import splitbee from "@/lib/splitbee";
import { useContext, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/router";
import { graphQLClient, gql } from "@/lib/api";
import { UniqueIdContext } from "@/context/UniqueIdContext";

const useReaction = (id: string, type: string) => {
  const QUERY_KEY = ["reaction", id, type];

  const uid = useContext(UniqueIdContext);
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    data: {
      getReaction: { count, reacted },
    },
  } = useQuery(
    QUERY_KEY,
    () =>
      graphQLClient.request(
        gql`
          query Reaction($id: ID!, $type: String!) {
            getReaction(id: $id, type: $type) {
              count
              reacted
            }
          }
        `,
        {
          id,
          type,
        },
        {
          uid,
        }
      ),
    {
      initialData: {
        getReaction: {
          count: 0,
          reacted: false,
        },
      },
      enabled: !!uid,
    }
  );

  const mutation = useMutation(
    () =>
      graphQLClient.request(
        gql`
          mutation Reaction($id: ID!, $type: String!) {
            react(id: $id, type: $type)
          }
        `,
        {
          id,
          type,
        },
        {
          uid,
        }
      ),
    {
      onMutate: async () => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries(QUERY_KEY);

        // Snapshot the previous value
        const previousReaction = queryClient.getQueryData(QUERY_KEY);

        // Optimistically update to the new value
        queryClient.setQueryData(
          QUERY_KEY,
          ({ getReaction: { count, reacted } }) => ({
            getReaction: {
              count: reacted ? count - 1 : count + 1,
              reacted: !reacted,
            },
          })
        );

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
      onSuccess: ({ react }) => {
        splitbee.track(react ? "React" : "Remove Reaction", {
          slug: router.asPath,
          type,
        });
      },
    }
  );

  const react = useCallback(() => {
    mutation.mutate();
  }, []);

  return {
    count,
    reacted,
    react,
  };
};

export default useReaction;
