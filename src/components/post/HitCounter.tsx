import useSWR from "swr";
import axios from "axios";
import type { FunctionComponent } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";

const fetcher = (url) =>
  axios.request({ url, method: "GET" }).then(({ data }) => data);

type Props = {
  id: string;
  title: string;
};

const HitCounter: FunctionComponent<Props> = ({ id, title }) => {
  const router = useRouter();
  const { data, mutate } = useSWR(`/api/hit/${id}`, fetcher, {
    initialData: 0,
  });

  useEffect(() => {
    if (router.query.id) {
      axios
        .request({
          url: `/api/hit/${id}`,
          method: "POST",
          data: { title, slug: router.asPath },
        })
        .then(() => mutate())
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
