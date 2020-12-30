import type { FunctionComponent } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const HitCounter: FunctionComponent = () => {
  const router = useRouter();
  const [hits, setHits] = useState<number>(0);

  useEffect(() => {
    if (router.query.id) {
      fetch(`/api/hit/${router.query.id}`)
        .then((response) => response.json())
        .then(({ hits }) => setHits(hits))
        .catch(() => {
          console.error("> Error fetching page view count");
        });
    }
  }, []);

  return (
    <p className="my-4 text-center text-black dark:text-white text-2xl font-semibold">{`${hits} views`}</p>
  );
};

export default HitCounter;
