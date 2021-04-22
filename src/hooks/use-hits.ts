import useSWR from "swr";
import { fetcher } from "@/lib/helpers";

const useHits = (id: string, initialHits: number = 0) => {
  const { data, mutate } = useSWR(`/api/hit/${id}`, fetcher, {
    initialData: initialHits,
    revalidateOnMount: true,
  });

  return { data, mutate };
};

export default useHits;
