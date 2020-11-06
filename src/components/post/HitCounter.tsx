import RetroHitCounter from "react-retro-hit-counter";
import useSWR from "swr";
import fetch from "unfetch";
import { FunctionComponent } from "react";
import { useRouter } from "next/router";

const fetcher = (url) => fetch(url).then((r) => r.json());

const HitCounter: FunctionComponent = () => {
  const router = useRouter();
  // Remove query from page URL (due to things like utterances)
  const path = router.asPath.split(/[?#]/)[0];
  const { data } = useSWR(`/api/register-hit?slug=${path}`, fetcher, {
    initialData: { hits: 0 },
    revalidateOnMount: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return <RetroHitCounter hits={data.hits} />;
};

export default HitCounter;
