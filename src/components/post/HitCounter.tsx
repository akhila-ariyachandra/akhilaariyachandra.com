import useSWR from "swr";
import axios from "axios";
import RetroHitCounter from "react-retro-hit-counter";
import type { FunctionComponent } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { fetcher } from "@/lib/helpers";

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
    <div className="grid place-items-center m-4">
      <RetroHitCounter hits={data} />
    </div>
  );
};

export default HitCounter;
