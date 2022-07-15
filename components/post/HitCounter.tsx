import useHits from "@/hooks/use-hits";
import { useRouter } from "next/router";
import type { FunctionComponent } from "react";
import { useEffect } from "react";
import RetroHitCounter from "react-retro-hit-counter";

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
