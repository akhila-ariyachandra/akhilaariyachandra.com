import useHits from "@/hooks/use-hits";
import RetroHitCounter from "react-retro-hit-counter";
import type { FunctionComponent } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";

const HitCounter: FunctionComponent = () => {
  const router = useRouter();
  const { data, increment } = useHits(router.query.id as string);

  useEffect(() => {
    increment();
  }, []);

  return (
    <div className="grid place-items-center m-4">
      <RetroHitCounter hits={data} />
    </div>
  );
};

export default HitCounter;
