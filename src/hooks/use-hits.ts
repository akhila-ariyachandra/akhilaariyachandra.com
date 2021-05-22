import axios from "axios";
import { fetcher } from "@/lib/helpers";
import { useQuery, useMutation } from "react-query";

const useHits = (id: string) => {
  const { data, refetch } = useQuery(
    ["pageHits", id],
    () => fetcher(`/api/hits/${id}`),
    {
      placeholderData: 0,
    }
  );
  const mutation = useMutation(
    () =>
      axios.request({
        url: `/api/hits/${id}`,
        method: "POST",
      }),
    {
      onSuccess: () => refetch(),
    }
  );

  return { data, increment: mutation.mutate };
};

export default useHits;
