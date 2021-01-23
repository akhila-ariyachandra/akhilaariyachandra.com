import React from "react";
import axios from "axios";
import splitbee from "src/lib/splitbee";
import useSWR from "swr";
import { ReactionType } from "src/lib/types";
import { useRouter } from "next/router";
import { UuidContext } from "src/context/UuidContext";

type ReactionProps = {
  type: ReactionType;
  emoji: string;
};

const Reaction: React.FunctionComponent<ReactionProps> = ({ type, emoji }) => {
  const uuid = React.useContext(UuidContext);
  const router = useRouter();
  const {
    data: { count, reacted },
    mutate,
  } = useSWR(
    [`/api/reaction/${router.query.id}/${type}`, uuid],
    (url, uuid) =>
      axios.request({ url, headers: { uuid } }).then(({ data }) => data),
    {
      initialData: {
        count: 0,
        reacted: false,
      },
      revalidateOnMount: true,
    }
  );

  const handleClick = async () => {
    // Optimistic update
    await mutate(
      { count: reacted ? count - 1 : count + 1, reacted: !reacted },
      false
    );

    await axios.request({
      url: "/api/reaction",
      method: "POST",
      headers: {
        uuid,
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
    <button
      className={`p-2 text-black dark:text-white text-xl rounded-lg ${
        reacted ? "bg-gray-400 bg-opacity-30" : ""
      }`}
      onClick={handleClick}
      aria-label={type}
    >
      {count === 0 ? emoji : `${emoji} ${count}`}
    </button>
  );
};

const Reactions: React.FunctionComponent = () => {
  return (
    <div className="grid gap-4 grid-cols-4 place-items-center p-4">
      <Reaction type={ReactionType.PlusOne} emoji="👍" />

      <Reaction type={ReactionType.MinusOne} emoji="👎" />

      <Reaction type={ReactionType.Laugh} emoji="😁" />

      <Reaction type={ReactionType.Hooray} emoji="🎉" />

      <Reaction type={ReactionType.Confused} emoji="😕" />

      <Reaction type={ReactionType.Heart} emoji="❤" />

      <Reaction type={ReactionType.Rocket} emoji="🚀" />

      <Reaction type={ReactionType.Eyes} emoji="👀" />
    </div>
  );
};

export default Reactions;
