import axios from "axios";
import { fetcher } from "@/lib/helpers";
import { useQuery, useMutation } from "react-query";
import { useRouter } from "next/router";

const useHits = (id: string, title: string, initialHits: number = 0) => {
  const router = useRouter();
  const { data, refetch } = useQuery(
    ["pageHits", id],
    () => fetcher(`/api/hit/${id}`),
    {
      placeholderData: initialHits,
    }
  );
  const mutation = useMutation(
    () =>
      axios.request({
        url: `/api/hit/${id}`,
        method: "POST",
        data: { title, slug: router.asPath },
      }),
    {
      onSuccess: () => refetch(),
    }
  );

  return { data, increment: mutation.mutate };
};

export default useHits;
