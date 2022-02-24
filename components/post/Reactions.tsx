import { useState, useEffect } from "react";
import useReaction from "@/hooks/use-reaction";
import useMeasure from "react-use-measure";
import type { FC } from "react";
import { useRouter } from "next/router";
import { useSpring, animated } from "@react-spring/web";
import { REACTION_LIMIT } from "@/lib/constants";

type Props = {
  showDescription?: boolean;
};

const Reactions: FC<Props> = ({ showDescription = true }) => {
  const [reactionCount, setReactionCount] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const router = useRouter();
  const { count, total, react } = useReaction(router.query.id as string);
  const [ref, { width }] = useMeasure();
  const props = useSpring({
    width: width * (reactionCount / REACTION_LIMIT),
  });

  useEffect(() => {
    setReactionCount(count);
    setTotalCount(total);
  }, [count, total]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (reactionCount !== count) {
        react(reactionCount - count);
      }
    }, 1000);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reactionCount, count]);

  const handleOnClick = () => {
    setReactionCount((reactionCount) => reactionCount + 1);
    setTotalCount((totalCount) => totalCount + 1);
  };

  return (
    <div className="my-10 flex w-full flex-col items-center justify-center space-y-4">
      {showDescription && (
        <p className="text-center font-sora text-xl font-medium text-zinc-800 dark:text-zinc-200">
          If you enjoyed this post please leave a like or two below!!!
        </p>
      )}

      <button
        ref={ref}
        className="relative h-[50px] w-[300px] overflow-hidden rounded-md border-4 border-zinc-700 dark:border-zinc-200"
        onClick={handleOnClick}
        disabled={reactionCount >= REACTION_LIMIT}
        aria-label="Like"
      >
        <animated.div
          style={props}
          className="absolute left-0 top-0 h-full bg-emerald-600 dark:bg-emerald-500"
        />

        <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center">
          <span className="text-2xl leading-3">
            {reactionCount === 0
              ? "😔"
              : reactionCount < REACTION_LIMIT
              ? "😊"
              : "😀"}
          </span>

          <span className="ml-2 rounded bg-white px-2 text-lg font-medium tracking-wide text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
            {totalCount}
          </span>
        </div>
      </button>
    </div>
  );
};

export default Reactions;
