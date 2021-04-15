import dynamic from "next/dynamic";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Title from "@/components/Title";
const GuestbookInput = dynamic(() => import("@/components/GuestbookInput"));
const CommentsList = dynamic(() => import("@/components/CommentsList"));
import type { NextPage, GetStaticProps } from "next";
import type { Comment } from "@/lib/types";
import { getComments } from "@/lib/guestbook";

type Props = {
  comments: Comment[];
};

const Guestbook: NextPage<Props> = ({ comments }) => {
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

      <GuestbookInput comments={comments} />

      <CommentsList comments={comments} />
    </Layout>
  );
};

export default Guestbook;

export const getStaticProps: GetStaticProps = async () => {
  const comments = await getComments();

  return {
    props: { comments },
    revalidate: 60,
  };
};
