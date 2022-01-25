import useHits from "@/hooks/use-hits";
import RetroHitCounter from "react-retro-hit-counter";
import type { FunctionComponent } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";

const HitCounter: FunctionComponent = () => {
  const router = useRouter();
  const { hits, increment } = useHits(router.query.id as string);

  useEffect(() => {
    increment();
  }, [increment]);

  return (
    <div className="m-4 grid place-items-center">
      <RetroHitCounter hits={hits} />
    </div>
  );
};

export default HitCounter;
