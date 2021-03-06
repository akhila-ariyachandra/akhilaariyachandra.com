import useReaction from "@/hooks/use-reaction";
import ReactTooltip from "react-tooltip";
import type { FC } from "react";
import type { ReactionType } from "@/prisma";
import { useRouter } from "next/router";

type ReactionProps = {
  type: ReactionType;
  emoji: string;
};

const Reaction: FC<ReactionProps> = ({ type, emoji }) => {
  const router = useRouter();
  const { count, reacted, react } = useReaction(
    router.query.id as string,
    type
  );

  return (
    <button
      className={`p-2 text-gray-800 dark:text-gray-200 text-xl rounded-lg ${
        reacted ? "bg-gray-400 bg-opacity-30" : ""
      }`}
      onClick={react}
      aria-label={type}
    >
      {count === 0 ? emoji : `${emoji} ${count}`}
    </button>
  );
};

const Reactions: FC = () => {
  return (
    <>
      <div className="md-full-bleed grid gap-4 grid-cols-2 place-items-center p-4 dark:bg-gray-800 bg-green-100 sm:grid-cols-4">
        <p
          className="col-span-full dark:text-gray-100 text-gray-800 text-lg font-medium"
          data-tip="No login required"
        >
          Leave a Reaction below
        </p>

        <Reaction type="PlusOne" emoji="👍" />

        <Reaction type="MinusOne" emoji="👎" />

        <Reaction type="Laugh" emoji="😁" />

        <Reaction type="Hooray" emoji="🎉" />

        <Reaction type="Confused" emoji="😕" />

        <Reaction type="Heart" emoji="❤" />

        <Reaction type="Rocket" emoji="🚀" />

        <Reaction type="Eyes" emoji="👀" />
      </div>

      <ReactTooltip />
    </>
  );
};

export default Reactions;
