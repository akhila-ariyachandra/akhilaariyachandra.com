import React from "react";
import firebase from "src/lib/firebase";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import type { Comment } from "src/lib/types";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { mutate } from "swr";

const auth = firebase.auth();

type Props = {
  comment: Comment;
};

const CommentContainer: React.FunctionComponent<Props> = ({ comment }) => {
  const router = useRouter();
  const [hidden, setHidden] = React.useState<boolean>(false);
  const [user] = useAuthState(auth);

  const handleDelete = async (id: string) => {
    try {
      setHidden(true);

      const token = await firebase.auth().currentUser.getIdToken();

      await axios.request({
        url: "/api/comment",
        method: "DELETE",
        headers: {
          token,
        },
        data: {
          id,
        },
      });

      toast.success("Comment successfully deleted!!!");
      await mutate(`/api/comment/${router.query.id}`);
    } catch {
      setHidden(false);
      toast.error("Error deleting comment! Please try again later.");
    }
  };

  if (!hidden) {
    return (
      <div className="flex flex-col p-2 bg-gray-100 rounded-md">
        <ReactMarkdown children={comment.body} className="prose mb-4" />

        <div className="flex flex-row items-center space-x-4">
          <div className="w-14 h-14 rounded-md overflow-hidden">
            <Image src={comment.picture} width={460} height={460} />
          </div>

          <p className="flex-1 text-lg font-normal">
            {"Posted by "}
            <span className="font-semibold">{comment.name}</span>
            {" on "}
            <span className="font-semibold">{comment.date}</span>
          </p>
        </div>

        {user?.uid === comment.userUid && (
          <button
            onClick={() => handleDelete(comment.id)}
            className="self-end p-2 w-16 text-white bg-red-600 rounded-md"
          >
            Delete
          </button>
        )}
      </div>
    );
  } else {
    return null;
  }
};

export default CommentContainer;
