import React from "react";
import useUser from "@/hooks/use-user";
import useSWR from "swr";
import firebase from "@/lib/firebase";
import axios from "axios";
import splitbee from "@/lib/splitbee";
import type { Comment } from "@/lib/types";
import { useFormik } from "formik";
import { fetcher } from "@/lib/helpers";
import {
  getAuth,
  getIdToken,
  signInWithRedirect,
  GithubAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";

type Props = {
  comments: Comment[];
};

const GuestbookInput: React.FunctionComponent<Props> = ({ comments }) => {
  const { data, mutate } = useSWR("/api/guestbook", fetcher, {
    initialData: comments,
    revalidateOnMount: true,
  });
  const { user, loadingUser } = useUser();

  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validate: ({ comment }) => {
      const errors = {};

      if (comment === "") {
        errors["comment"] = "Comment cannot be empty";
      }

      return errors;
    },
    onSubmit: async ({ comment }, { resetForm, setSubmitting }) => {
      try {
        const auth = getAuth(firebase);
        const token = await getIdToken(auth.currentUser);
        const { uid, displayName, photoURL } = auth.currentUser;

        // Optimistic update
        await mutate(
          [
            {
              id: "new",
              created: new Date(),
              comment,
              user: {
                uid,
                displayName,
                photoURL,
              },
            },
            ...data,
          ],
          false
        );

        await axios.request({
          url: "/api/guestbook",
          method: "POST",
          headers: {
            token,
          },
          data: {
            comment,
          },
        });

        splitbee.track("Signed guestbook");
        resetForm();

        await mutate();
      } catch {
        console.error("> Error signing guestbook. Please try again later.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleLogin = async (type: "github" | "google") => {
    const auth = getAuth(firebase);
    let provider;

    switch (type) {
      case "github":
        provider = new GithubAuthProvider();
        break;
      case "google":
        provider = new GoogleAuthProvider();
        break;
    }

    await signInWithRedirect(auth, provider);
  };

  return (
    <div className="mx-4 p-4 dark:bg-gray-800 bg-green-100 border-2 dark:border-gray-700 border-green-200 rounded-lg">
      <p className="dark:text-gray-100 text-gray-800 text-xl font-semibold">
        Sign the Guestbook
      </p>

      <p className="my-1 dark:text-gray-100 text-gray-800 text-lg font-medium">
        Share a comment for a future visitor of my site.
      </p>

      <div className="my-3">
        {!user ? (
          <div className="flex flex-row space-x-4">
            <button
              className="border-[1px] px-6 py-2 dark:text-gray-100 text-gray-800 text-base font-medium dark:bg-gray-700 bg-green-200 border-transparent rounded"
              onClick={() => handleLogin("github")}
              disabled={loadingUser}
            >
              GitHub
            </button>

            <button
              className="border-[1px] px-6 py-2 dark:text-gray-100 text-gray-800 text-base font-medium dark:bg-gray-700 bg-green-200 border-transparent rounded"
              onClick={() => handleLogin("google")}
              disabled={loadingUser}
            >
              Google
            </button>
          </div>
        ) : (
          <form onSubmit={formik.handleSubmit} className="relative w-full">
            <input
              id="comment"
              name="comment"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.comment}
              disabled={formik.isSubmitting}
              className="pr-[5.5rem] dark:focus:border-green-600 w-full text-base font-normal dark:bg-gray-700 bg-white dark:border-gray-700 focus:border-green-600 border-white rounded focus:ring-green-600"
            />

            <button
              type="submit"
              className="absolute bottom-1 right-1 top-1 px-6 py-1 dark:text-gray-100 text-gray-800 text-base font-medium bg-gray-200 dark:bg-gray-600 rounded"
              disabled={formik.isSubmitting}
            >
              Sign
            </button>
          </form>
        )}
      </div>

      <p className="dark:text-gray-100 text-gray-800 text-base">
        Your information is only used to display your name.
      </p>
    </div>
  );
};

export default GuestbookInput;
