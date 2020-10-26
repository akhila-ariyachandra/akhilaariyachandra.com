import RetroHitCounter from "react-retro-hit-counter";
import { FunctionComponent, useState, useEffect } from "react";
import { useRouter } from "next/router";

const HitCounter: FunctionComponent = () => {
  const [hits, setHits] = useState<number>(undefined);
  const router = useRouter();

  useEffect(() => {
    // Invoke the function by making a request.
    fetch(`/api/register-hit?slug=${router.asPath}`)
      .then((res) => res.json())
      .then((json) => {
        if (typeof json.hits === "number") {
          setHits(json.hits);
        }
      });
  }, [router.asPath]);

  if (typeof hits === "undefined") {
    return null;
  }

  return <RetroHitCounter hits={hits} />;
};

export default HitCounter;
