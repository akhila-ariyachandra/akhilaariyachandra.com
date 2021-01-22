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
};

const Reaction: React.FunctionComponent<ReactionProps> = ({ type }) => {
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

  let emoji;
  switch (type) {
    case ReactionType.PlusOne:
      emoji = "👍";
      break;
    case ReactionType.MinusOne:
      emoji = "👎";
      break;
    case ReactionType.Laugh:
      emoji = "😁";
      break;
    case ReactionType.Hooray:
      emoji = "🎉";
      break;
    case ReactionType.Confused:
      emoji = "😕";
      break;
    case ReactionType.Heart:
      emoji = "❤";
      break;
    case ReactionType.Rocket:
      emoji = "🚀";
      break;
    case ReactionType.Eyes:
      emoji = "👀";
      break;
  }

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
      <Reaction type={ReactionType.PlusOne} key={ReactionType.PlusOne} />

      <Reaction type={ReactionType.MinusOne} key={ReactionType.PlusOne} />

      <Reaction type={ReactionType.Laugh} key={ReactionType.PlusOne} />

      <Reaction type={ReactionType.Hooray} key={ReactionType.PlusOne} />

      <Reaction type={ReactionType.Confused} key={ReactionType.PlusOne} />

      <Reaction type={ReactionType.Heart} key={ReactionType.PlusOne} />

      <Reaction type={ReactionType.Rocket} key={ReactionType.PlusOne} />

      <Reaction type={ReactionType.Eyes} key={ReactionType.PlusOne} />
    </div>
  );
};

export default Reactions;
