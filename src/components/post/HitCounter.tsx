import { FunctionComponent, useState, useEffect } from "react";
import { useRouter } from "next/router";

const HitCounter: FunctionComponent = () => {
  const router = useRouter();
  const [hits, setHits] = useState<number>(0);
  // Remove query from page URL (due to things like utterances)
  const path = router.asPath.split(/[?#]/)[0];

  useEffect(() => {
    fetch(`/api/register-hit?slug=${path}`)
      .then((response) => response.json())
      .then(({ hits }) => setHits(hits));
  }, []);

  return (
    <p className="text-center text-2xl sm:text-3xl font-semibold my-4">{`${hits} views`}</p>
  );
};

export default HitCounter;
