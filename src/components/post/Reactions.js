import React from "react";
import axios from "axios";
import splitbee from "@/lib/splitbee";
import useSWR from "swr";
import useBoop from "@/hooks/use-boop";
import ReactTooltip from "react-tooltip";
import { ReactionType } from "@/lib/types";
import { useRouter } from "next/router";
import { animated } from "react-spring";
import { UniqueIdContext } from "@/context/UniqueIdContext";

const BOOP_AMOUNT = 10;

const Reaction = ({ type, emoji }) => {
  const uniqueId = React.useContext(UniqueIdContext);
  const router = useRouter();
  const {
    data: { count, reacted },
    mutate,
  } = useSWR(
    [`/api/reaction/${router.query.id}/${type}`, uniqueId],
    (url, uniqueId) =>
      axios
        .request({ url, headers: { uniqueid: uniqueId } })
        .then(({ data }) => data),
    {
      initialData: {
        count: 0,
        reacted: false,
      },
      revalidateOnMount: true,
    }
  );
  const [style, trigger] = useBoop({
    y: reacted ? BOOP_AMOUNT * -1 : BOOP_AMOUNT,
  });

  const handleClick = async () => {
    // Optimistic update
    await mutate(
      { count: reacted ? count - 1 : count + 1, reacted: !reacted },
      false
    );
    trigger();

    await axios.request({
      url: "/api/reaction",
      method: "POST",
      headers: {
        uniqueid: uniqueId,
      },
      data: {
        id: router.query.id,
        type,
      },
    });

    splitbee.track("React", {
      slug: router.asPath,
      type,
    });

    await mutate();
  };

  return (
    <animated.button
      className={`p-2 text-gray-800 dark:text-gray-200 text-xl rounded-lg ${
        reacted ? "bg-gray-400 bg-opacity-30" : ""
      }`}
      style={style}
      onClick={handleClick}
      aria-label={type}
    >
      {count === 0 ? emoji : `${emoji} ${count}`}
    </animated.button>
  );
};

const Reactions = () => {
  return (
    <>
      <div className="full-bleed grid gap-4 grid-cols-2 place-items-center mx-auto p-4 max-w-screen-md dark:bg-gray-800 bg-green-100 sm:grid-cols-4 md:rounded-lg">
        <p
          className="col-span-full dark:text-gray-100 text-gray-800 text-lg font-medium"
          data-tip="No login required"
        >
          Leave a Reaction below
        </p>

        <Reaction type={ReactionType.PlusOne} emoji="👍" />

        <Reaction type={ReactionType.MinusOne} emoji="👎" />

        <Reaction type={ReactionType.Laugh} emoji="😁" />

        <Reaction type={ReactionType.Hooray} emoji="🎉" />

        <Reaction type={ReactionType.Confused} emoji="😕" />

        <Reaction type={ReactionType.Heart} emoji="❤" />

        <Reaction type={ReactionType.Rocket} emoji="🚀" />

        <Reaction type={ReactionType.Eyes} emoji="👀" />
      </div>

      <ReactTooltip />
    </>
  );
};

export default Reactions;
