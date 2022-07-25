import RetroHitCounter from "react-retro-hit-counter";
import type { FC } from "react";

type HitCounterProps = {
  hits?: number;
};

const HitCounter: FC<HitCounterProps> = ({ hits = 0 }) => {
  return (
    <div className="m-4 grid place-items-center">
      <RetroHitCounter hits={hits} />
    </div>
  );
};

export default HitCounter;
