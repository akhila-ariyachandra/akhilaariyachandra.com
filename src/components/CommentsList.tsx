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
    <div className="mx-4 my-10 grid grid-cols-1 gap-4 divide-gray-200 dark:divide-gray-600 divide-y">
      {data.map((comment) => (
        <div
          key={comment.id}
          className="pt-4 flex flex-row items-center justify-between flex-nowrap space-x-2"
        >
          <div className="space-y-2 flex-1 truncate">
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 whitespace-normal">
              {comment.comment}
            </p>

            <div className="flex flex-col sm:flex-row truncate">
              <p className="text-base font-medium text-gray-600 dark:text-gray-300 truncate">
                {comment.user.displayName}
              </p>

              <span className="mx-2 text-base font-light text-gray-400 dark:text-gray-500 hidden sm:inline">
                /
              </span>

              <p className="text-base font-normal text-gray-500 dark:text-gray-400 truncate">{`${dayjs(
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
              className="text-red-600 p-1 flex-shrink-0"
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
