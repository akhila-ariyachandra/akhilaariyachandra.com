import React from "react";
import axios from "axios";
import splitbee from "@/lib/splitbee";
import useBoop from "@/hooks/use-boop";
import ReactTooltip from "react-tooltip";
import { ReactionType } from "@/lib/types";
import { useRouter } from "next/router";
import { animated } from "react-spring";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { UniqueIdContext } from "@/context/UniqueIdContext";

const BOOP_AMOUNT = 10;

const Reaction = ({ type, emoji }) => {
  const uid = React.useContext(UniqueIdContext);
  const router = useRouter();
  const queryClient = useQueryClient();
  const QUERY_KEY = ["reaction", router.query.id, type];
  const {
    data: { count, reacted },
  } = useQuery(
    QUERY_KEY,
    () =>
      axios
        .request({
          url: `/api/reaction/${router.query.id}/${type}`,
          headers: { uid },
        })
        .then(({ data }) => data),
    {
      initialData: {
        count: 0,
        reacted: false,
      },
      enabled: !!uid,
    }
  );
  const [style, trigger] = useBoop({
    y: reacted ? BOOP_AMOUNT * -1 : BOOP_AMOUNT,
  });
  const mutation = useMutation(
    () =>
      axios.request({
        url: `/api/reaction/${router.query.id}/${type}`,
        method: "POST",
        headers: {
          uid,
        },
        data: {
          id: router.query.id,
          type,
        },
      }),
    {
      onMutate: async () => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries(QUERY_KEY);

        // Snapshot the previous value
        const previousReaction = queryClient.getQueryData(QUERY_KEY);

        // Optimistically update to the new value
        queryClient.setQueryData(QUERY_KEY, ({ count, reacted }) => ({
          count: reacted ? count - 1 : count + 1,
          reacted: !reacted,
        }));
        trigger();

        // Return a context object with the snapshotted value
        return { previousReaction };
      },
      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (err, newReaction, context) => {
        queryClient.setQueryData(QUERY_KEY, context.previousReaction);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(QUERY_KEY);
      },
      onSuccess: () => {
        splitbee.track("React", {
          slug: router.asPath,
          type,
        });
      },
    }
  );

  return (
    <animated.button
      className={`p-2 text-gray-800 dark:text-gray-200 text-xl rounded-lg ${
        reacted ? "bg-gray-400 bg-opacity-30" : ""
      }`}
      style={style}
      onClick={mutation.mutate}
      aria-label={type}
    >
      {count === 0 ? emoji : `${emoji} ${count}`}
    </animated.button>
  );
};

const Reactions = () => {
  return (
    <>
      <div className="md-full-bleed grid gap-4 grid-cols-2 place-items-center p-4 dark:bg-gray-800 bg-green-100 sm:grid-cols-4">
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
