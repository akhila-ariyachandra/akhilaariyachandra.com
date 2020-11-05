import RetroHitCounter from "react-retro-hit-counter";
import useSWR from "swr";
import fetch from "unfetch";
import { FunctionComponent } from "react";
import { useRouter } from "next/router";

const fetcher = (url) => fetch(url).then((r) => r.json());

const HitCounter: FunctionComponent = () => {
  const router = useRouter();
  const { data } = useSWR(`/api/register-hit?slug=${router.asPath}`, fetcher, {
    initialData: { hits: 0 },
    revalidateOnMount: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return <RetroHitCounter hits={data.hits} />;
};

export default HitCounter;
