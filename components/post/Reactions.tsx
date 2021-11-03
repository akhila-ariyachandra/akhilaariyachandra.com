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
    <div className="flex flex-col items-center justify-center my-10 w-full space-y-4">
      {showDescription && (
        <p className="text-center dark:text-gray-200 text-gray-800 font-sora text-xl font-medium">
          If you enjoyed this post please leave a like or two below!!!
        </p>
      )}

      <button
        ref={ref}
        className="w-[300px] h-[50px] relative border-4 dark:border-gray-200 border-gray-700 rounded-md overflow-hidden"
        onClick={handleOnClick}
        disabled={reactionCount >= REACTION_LIMIT}
        aria-label="Like"
      >
        <animated.div
          style={props}
          className="absolute left-0 top-0 h-full dark:bg-green-500 bg-green-600"
        />

        <div className="absolute z-10 left-0 top-0 flex items-center justify-center w-full h-full">
          <span className="text-2xl leading-3">
            {reactionCount === 0
              ? "😔"
              : reactionCount < REACTION_LIMIT
              ? "😊"
              : "😀"}
          </span>

          <span className="ml-2 px-2 dark:text-gray-200 text-gray-800 text-lg font-medium tracking-wide dark:bg-gray-900 bg-white rounded">
            {totalCount}
          </span>
        </div>
      </button>
    </div>
  );
};

export default Reactions;
