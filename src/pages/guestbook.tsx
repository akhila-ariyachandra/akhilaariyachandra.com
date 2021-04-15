import firebase from "@/lib/firebase";
import axios from "axios";
import useUser from "@/hooks/use-user";
import useSWR from "swr";
import dayjs from "dayjs";
import splitbee from "@/lib/splitbee";
import dynamic from "next/dynamic";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Title from "@/components/Title";
const GuestbookInput = dynamic(() => import("@/components/GuestbookInput"));
import type { NextPage, GetStaticProps } from "next";
import { fetcher } from "@/lib/helpers";
import { getAuth, getIdToken } from "firebase/auth";
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

  const handleDelete = async (id: string) => {
    try {
      const auth = getAuth(firebase);
      const token = await getIdToken(auth.currentUser);

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

      <GuestbookInput />

      <div className="mx-4 my-10 grid grid-cols-1 gap-4 divide-gray-200 dark:divide-gray-600 divide-y">
        {data.map((message) => (
          <div
            key={message.id}
            className="pt-4 flex flex-row items-center justify-between flex-nowrap space-x-2"
          >
            <div className="space-y-2 flex-1 truncate">
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 whitespace-normal">
                {message.message}
              </p>

              <div className="flex flex-col sm:flex-row truncate">
                <p className="text-base font-medium text-gray-600 dark:text-gray-300 truncate">
                  {message.user.displayName}
                </p>

                <span className="mx-2 text-base font-light text-gray-400 dark:text-gray-500 hidden sm:inline">
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
