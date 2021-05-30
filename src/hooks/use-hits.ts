import { useCallback } from "react";
import { useQuery, useMutation } from "react-query";
import { graphQLClient, gql } from "@/lib/api";

const useHits = (id: string) => {
  const {
    data: { getHits: hits },
    refetch,
  } = useQuery(
    ["pageHits", id],
    () =>
      graphQLClient.request(
        gql`
          query PageHits($id: ID!) {
            getHits(id: $id)
          }
        `,
        {
          id,
        }
      ),
    {
      placeholderData: {
        getHits: 0,
      },
    }
  );
  const mutation = useMutation(
    () =>
      graphQLClient.request(
        gql`
          mutation PageHits($id: ID!) {
            incrementHits(id: $id)
          }
        `,
        {
          id,
        }
      ),
    {
      onSuccess: () => refetch(),
    }
  );

  const increment = useCallback(() => {
    mutation.mutate();
  }, []);

  return { hits, increment };
};

export default useHits;
