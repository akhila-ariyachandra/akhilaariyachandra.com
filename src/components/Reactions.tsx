import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import splitbee from "src/lib/splitbee";
import useSWR, { mutate } from "swr";
import { ReactionType } from "src/lib/types";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

const fetcher = (url) => fetch(url).then((r) => r.json());

type ReactionProps = {
  type: ReactionType;
  emoji: string;
};

const Reaction: React.FunctionComponent<ReactionProps> = ({ type, emoji }) => {
  const [isPressed, setIsPressed] = React.useState<boolean>(false);
  const [isChanging, setIsChanging] = React.useState<boolean>(false);
  const router = useRouter();
  const { data } = useSWR(`/api/reaction/${router.query.id}/${type}`, fetcher, {
    initialData: 0,
  });

  React.useEffect(() => {
    const cookies = parseCookies();

    if (cookies[`${router.query.id}-${type}`]) {
      setIsPressed(true);
    } else {
      setIsPressed(false);
    }
  }, [data, isChanging]);

  const handleClick = async () => {
    try {
      setIsChanging(true);

      // If cookie has not been set increment
      if (!isPressed) {
        await axios.request({
          url: "/api/reaction",
          method: "POST",
          data: {
            id: router.query.id,
            type,
          },
        });

        splitbee.track("React", {
          slug: router.asPath,
          type,
        });
      } else {
        await axios.request({
          url: "/api/reaction",
          method: "DELETE",
          data: {
            id: router.query.id,
            type,
          },
        });

        splitbee.track("Remove Reaction", {
          id: router.asPath,
          type,
        });
      }

      await mutate(`/api/reaction/${router.query.id}/${type}`);
    } catch {
      toast.error(<b>Please try again later</b>);
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <button
      className={`p-2 text-black dark:text-white text-xl rounded-lg ${
        isPressed ? "bg-gray-400 bg-opacity-30" : ""
      }`}
      onClick={handleClick}
      disabled={isChanging}
      aria-label={type}
    >
      {data === 0 ? emoji : `${emoji} ${data}`}
    </button>
  );
};

const Reactions: React.FunctionComponent = () => {
  return (
    <div className="grid gap-4 grid-cols-4 place-items-center p-4">
      <Reaction
        type={ReactionType.PlusOne}
        emoji="👍"
        key={ReactionType.PlusOne}
      />

      <Reaction
        type={ReactionType.MinusOne}
        emoji="👎"
        key={ReactionType.MinusOne}
      />

      <Reaction type={ReactionType.Laugh} emoji="😁" key={ReactionType.Laugh} />

      <Reaction
        type={ReactionType.Hooray}
        emoji="🎉"
        key={ReactionType.Hooray}
      />

      <Reaction
        type={ReactionType.Confused}
        emoji="😕"
        key={ReactionType.Confused}
      />

      <Reaction type={ReactionType.Heart} emoji="❤" key={ReactionType.Heart} />

      <Reaction
        type={ReactionType.Rocket}
        emoji="🚀"
        key={ReactionType.Rocket}
      />

      <Reaction type={ReactionType.Eyes} emoji="👀" key={ReactionType.Eyes} />
    </div>
  );
};

export default Reactions;
