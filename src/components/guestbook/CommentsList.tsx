import React from "react";
import firebase from "@/lib/firebase";
import axios from "axios";
import useUser from "@/hooks/use-user";
import useSWR from "swr";
import dayjs from "dayjs";
import splitbee from "@/lib/splitbee";
import type { Comment } from "@/lib/types";
import { fetcher } from "@/lib/helpers";
import { getAuth, getIdToken } from "firebase/auth";
import { FaTrash } from "react-icons/fa";

type Props = {
  comments: Comment[];
};

const CommentsList: React.FunctionComponent<Props> = ({ comments }) => {
  const { data, mutate } = useSWR("/api/guestbook", fetcher, {
    initialData: comments,
    revalidateOnMount: true,
  });
  const { user } = useUser();

  const handleDelete = async (id: string) => {
    try {
      const auth = getAuth(firebase);
      const token = await getIdToken(auth.currentUser);

      // Optimistic update
      await mutate(
        data.filter((comment) => comment.id !== id),
        false
      );

      await axios.request({
        url: "/api/guestbook",
        method: "DELETE",
        headers: {
          token,
        },
        data: {
          id,
        },
      });

      splitbee.track("Deleted comment from guestbook");
    } catch {
      console.error("> Error deleting comment. Please try again later.");
    } finally {
      await mutate();
    }
  };

  return (
    <div className="grid gap-4 grid-cols-1 mx-4 my-10 divide-gray-200 dark:divide-gray-600 divide-y">
      {data.map((comment) => (
        <div
          key={comment.id}
          className="flex flex-row flex-nowrap items-center justify-between pt-4 space-x-2"
        >
          <div className="flex-1 space-y-2 truncate">
            <p className="dark:text-gray-200 text-gray-800 whitespace-normal text-lg font-semibold">
              {comment.comment}
            </p>

            <div className="flex flex-col truncate sm:flex-row">
              <p className="dark:text-gray-300 text-gray-600 text-base font-medium truncate">
                {comment.user.displayName}
              </p>

              <span className="hidden mx-2 text-gray-400 dark:text-gray-500 text-base font-light sm:inline">
                /
              </span>

              <p className="dark:text-gray-400 text-gray-500 text-base font-normal truncate">{`${dayjs(
                comment.timestamp
              ).format("D MMM YYYY")} at ${dayjs(comment.timestamp).format(
                "h:mm a"
              )}`}</p>
            </div>
          </div>

          {comment.user.uid === user?.uid ? (
            <button
              onClick={() => handleDelete(comment.id)}
              aria-label="Delete comment"
              className="flex-shrink-0 p-1 text-red-600"
            >
              <FaTrash />
            </button>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default CommentsList;
