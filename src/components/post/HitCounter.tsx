import useSWR, { mutate } from "swr";
import type { FunctionComponent } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";

const fetcher = (url) => fetch(url).then((r) => r.json());

const HitCounter: FunctionComponent = () => {
  const router = useRouter();
  const { data } = useSWR(`/api/hit/${router.query.id}`, fetcher, {
    initialData: 0,
  });

  useEffect(() => {
    if (router.query.id) {
      fetch(`/api/hit/${router.query.id}`, { method: "POST" })
        .then(() => mutate(`/api/hit/${router.query.id}`))
        .catch(() => {
          console.error("> Error incrementing page view count");
        });
    }
  }, []);

  return (
    <p className="my-4 text-center text-black dark:text-white text-2xl font-semibold">{`${data} views`}</p>
  );
};

export default HitCounter;
