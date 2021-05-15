import useHits from "@/hooks/use-hits";
import RetroHitCounter from "react-retro-hit-counter";
import type { FunctionComponent } from "react";
import { useEffect } from "react";

type Props = {
  id: string;
  title: string;
  hits: number;
};

const HitCounter: FunctionComponent<Props> = ({ id, title, hits }) => {
  const { data, increment } = useHits(id, title, hits);

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
