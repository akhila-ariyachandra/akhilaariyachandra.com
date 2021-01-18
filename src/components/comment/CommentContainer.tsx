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
  const [user] = useAuthState(auth);

  // Handles the actual deleting of the comment
  const deleteComment = async (id: string) => {
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

    await mutate(`/api/comment/${router.query.id}`);
  };

  // Used for the toast
  const handleDelete = async (id: string) => {
    toast.promise(deleteComment(id), {
      loading: "Deleting",
      success: <b>Comment deleted!</b>,
      error: <b>Could not delete.</b>,
    });
  };

  return (
    <div className="flex flex-col p-2 bg-gray-100 rounded-md">
      <ReactMarkdown children={comment.body} className="prose mb-4" />

      <div className="flex flex-row items-center">
        <div className="hidden w-14 h-14 rounded-md overflow-hidden sm:block sm:mr-4">
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
};

export default CommentContainer;
