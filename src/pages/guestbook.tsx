import firebase from "@/lib/firebase";
import axios from "axios";
import useUser from "@/hooks/use-user";
import useSWR from "swr";
import dayjs from "dayjs";
import splitbee from "@/lib/splitbee";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Title from "@/components/Title";
import type { NextPage, GetStaticProps } from "next";
import { useFormik } from "formik";
import { fetcher } from "@/lib/helpers";
import { getMessages } from "@/lib/guestbook";
import { FaTrash } from "react-icons/fa";

type Props = {
  messages: [
    {
      id: string;
      message: string;
      timestamp: Date;
      user: {
        uid: string;
        displayName: string;
        photoURL: string;
      };
    }
  ];
};

const Guestbook: NextPage<Props> = ({ messages }) => {
  const { data, mutate } = useSWR("/api/guestbook", fetcher, {
    initialData: messages,
    revalidateOnMount: true,
  });
  const { user } = useUser();
  const formik = useFormik({
    initialValues: {
      message: "",
    },
    onSubmit: async ({ message }, { resetForm, setSubmitting }) => {
      try {
        const token = await firebase.auth().currentUser.getIdToken();
        const { uid, displayName, photoURL } = firebase.auth().currentUser;

        // Optimistic update
        await mutate(
          [
            {
              id: "new",
              created: new Date(),
              message,
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
            message,
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

  const handleLogin = async () => {
    const provider = new firebase.auth.GithubAuthProvider();

    await firebase.auth().signInWithRedirect(provider);
  };

  const handleDelete = async (id: string) => {
    try {
      const token = await firebase.auth().currentUser.getIdToken();

      // Optimistic update
      await mutate(
        data.filter((message) => message.id !== id),
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

      splitbee.track("Deleted message from guestbook");
    } catch {
      console.error("> Error deleting message. Please try again later.");
    } finally {
      await mutate();
    }
  };

  return (
    <Layout>
      <SEO
        title="Guestbook"
        description="Sign my digital guestbook and share some wisdom."
      />

      <div className="my-6">
        <Title title="Guestbook" />

        <h2 className="mx-4 dark:text-gray-200 text-gray-800">
          Leave a comment below. It could be anything – appreciation,
          information, wisdom, or even humor. Surprise me!
        </h2>
      </div>

      <div className="mx-4 p-4 bg-green-100 dark:bg-gray-800 border-2 rounded-lg border-green-200 dark:border-gray-700">
        <p className="text-gray-800 dark:text-gray-100 text-xl font-semibold">
          Sign the Guestbook
        </p>

        <p className="text-gray-800 dark:text-gray-100 text-lg font-medium my-1">
          Share a message for a future visitor of my site.
        </p>

        <div className="my-3">
          {!user ? (
            <button
              className="text-gray-800 dark:text-gray-100 text-base font-medium bg-green-200 dark:bg-gray-700 px-6 py-2 rounded border-[1px] border-transparent"
              onClick={handleLogin}
            >
              Login
            </button>
          ) : (
            <form onSubmit={formik.handleSubmit} className="w-full relative">
              <input
                id="message"
                name="message"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.message}
                disabled={formik.isSubmitting}
                className="w-full pr-[5.5rem] rounded dark:bg-gray-700 bg-white text-base font-normal border-white dark:border-gray-700 focus:border-green-600 dark:focus:border-green-600 focus:ring-green-600"
              />

              <button
                type="submit"
                className="text-gray-800 dark:text-gray-100 text-base font-medium bg-gray-200 dark:bg-gray-600 px-6 py-1 rounded absolute top-1 bottom-1 right-1"
                disabled={formik.isSubmitting}
              >
                Sign
              </button>
            </form>
          )}
        </div>

        <p className="text-gray-800 dark:text-gray-100 text-base">
          Your information is only used to display your name and reply by email.
        </p>
      </div>

      <div className="mx-4 my-10 grid grid-cols-1 gap-4 divide-gray-200 dark:divide-gray-600 divide-y">
        {data.map((message) => (
          <div
            key={message.id}
            className="pt-4 flex flex-row items-center justify-between flex-nowrap space-x-2"
          >
            <div className="space-y-1 flex-1 truncate">
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 whitespace-normal">
                {message.message}
              </p>

              <div className="flex flex-row truncate">
                <p className="text-base font-medium text-gray-600 dark:text-gray-300 truncate">
                  {message.user.displayName}
                </p>

                <span className="mx-2 text-base font-light text-gray-400 dark:text-gray-500 truncate">
                  /
                </span>

                <p className="text-base font-normal text-gray-500 dark:text-gray-400 truncate">{`${dayjs(
                  message.timestamp
                ).format("D MMM YYYY")} at ${dayjs(message.timestamp).format(
                  "h:mm a"
                )}`}</p>
              </div>
            </div>

            {message.user.uid === user?.uid ? (
              <button
                onClick={() => handleDelete(message.id)}
                aria-label="Delete message"
                className="text-red-600 p-1 flex-shrink-0"
              >
                <FaTrash />
              </button>
            ) : null}
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Guestbook;

export const getStaticProps: GetStaticProps = async () => {
  const messages = await getMessages();

  return {
    props: { messages },
    revalidate: 60,
  };
};
