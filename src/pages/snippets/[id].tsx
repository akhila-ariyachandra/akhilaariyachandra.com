import hydrate from "next-mdx-remote/hydrate";
import dynamic from "next/dynamic";
import admin from "src/lib/firebaseAdmin";
import Layout from "src/components/Layout";
import SEO from "src/components/SEO";
import Code from "src/components/code/Code";
const CommentsList = dynamic(
  () => import("src/components/comment/CommentsList")
);
const Reactions = dynamic(() => import("src/components/Reactions"));
import Image from "next/image";
import type { NextPage, GetStaticPaths, GetStaticProps } from "next";
import type { Snippet as SnippetType, Comment } from "src/lib/types";
import { getAllSnippetIds, getSnippetData } from "src/lib/snippets";
import { formatDate } from "src/lib/helpers";

import styles from "src/styles/snippets/snippet.module.scss";

const mdxComponents = {
  pre: (props) => <Code {...props} />,
  Image,
};

type Props = {
  snippet: SnippetType;
  comments: Comment[];
};

const Snippet: NextPage<Props> = ({ snippet, comments }) => {
  const content = hydrate(snippet.content, {
    components: mdxComponents,
  });

  return (
    <Layout>
      <SEO
        title={snippet.title}
        description={snippet.description}
        image="/snippets-cover.jpg"
      />

      <h1 className="pseudo-full-bleed my-8 px-4 text-center text-black dark:text-white text-4xl font-black">
        {snippet.title}
      </h1>

      <p className="pseudo-full-bleed my-2 px-4 text-center text-black dark:text-white text-lg font-medium">
        {snippet.description}
      </p>

      <div className={`prose dark:prose-dark p-4 ${styles.prose}`}>
        {content}
      </div>

      {/* <Reactions /> */}

      <CommentsList comments={comments} />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllSnippetIds();

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params.id as string;
  const snippet = await getSnippetData(id);

  // Get comments
  const db = admin.firestore();
  const commentsRef = db.collection("comments");
  const snapshot = await commentsRef
    .where("id", "==", id)
    .orderBy("date")
    .get();
  const rawComments = [];
  const comments = [];
  if (!snapshot.empty) {
    snapshot.forEach((doc) => {
      rawComments.push({ ...doc.data(), id: doc.id });
    });

    for (const doc of rawComments) {
      const user = await admin.auth().getUser(doc.userUid);

      comments.push({
        id: doc.id,
        userUid: doc.userUid,
        name: user.displayName,
        picture: user.photoURL,
        body: doc.body,
        date: formatDate(doc.date.toDate().toString()),
      });
    }
  }

  return {
    props: { snippet, comments },
  };
};

export default Snippet;
