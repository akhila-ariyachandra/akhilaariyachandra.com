import axios from "axios";
import useHits from "@/hooks/use-hits";
import RetroHitCounter from "react-retro-hit-counter";
import type { FunctionComponent } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";

type Props = {
  id: string;
  title: string;
  hits: number;
};

const HitCounter: FunctionComponent<Props> = ({ id, title, hits }) => {
  const router = useRouter();
  const { data, mutate } = useHits(id, hits);

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
