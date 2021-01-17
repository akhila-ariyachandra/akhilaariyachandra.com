import React from "react";
import firebase from "src/lib/firebase";
import axios from "axios";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import useSWR, { mutate } from "swr";
import type { Comment } from "src/lib/types";
import { useAuthState } from "react-firebase-hooks/auth";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { fetcher } from "src/lib/helpers";
import { FaGithub, FaMarkdown } from "react-icons/fa";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import styles from "src/components/Comment.module.scss";
import "react-tabs/style/react-tabs.css";

const auth = firebase.auth();

type Props = {
  comments?: Comment[];
};

const CommentList: React.FunctionComponent<Props> = ({ comments = [] }) => {
  const router = useRouter();
  const { data } = useSWR(`/api/comment/${router.query.id}`, fetcher, {
    initialData: comments,
  });
  const [user, loading] = useAuthState(auth);
  const [userLoaded, setUserLoaded] = React.useState<boolean>(false);
  const formik = useFormik({
    initialValues: {
      body: "",
    },
    validate: (values) => {
      const errors: any = {};

      if (values.body.length === 0) {
        errors.body = "Required";
      }

      return errors;
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const token = await firebase.auth().currentUser.getIdToken();

      await axios.request({
        url: "/api/comment",
        method: "POST",
        headers: {
          token,
        },
        data: {
          body: values.body,
          id: router.query.id,
        },
      });

      await mutate(`/api/comment/${router.query.id}`);
      resetForm();
      setSubmitting(false);
    },
  });

  React.useEffect(() => {
    if (!loading && user) {
      setUserLoaded(true);
    } else {
      setUserLoaded(false);
    }
  }, [user, loading]);

  const handleLogin = async (type: "github") => {
    try {
      let provider;
      switch (type) {
        case "github":
          provider = new firebase.auth.GithubAuthProvider();
          break;
      }

      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      console.log("> Error logging in: ", error);
    }
  };

  const handleSignout = async () => {
    setUserLoaded(false);
    await firebase.auth().signOut();
  };

  return (
    <div className="full-bleed m-4 mx-auto p-2 max-w-screen-sm bg-white sm:rounded-lg">
      <div className="grid gap-4 grid-cols-1 mb-4">
        {data.map((comment: Comment) => (
          <div
            key={comment.id}
            className="p-2 bg-gray-100 rounded-md space-y-2"
          >
            <div className="flex flex-row space-x-4">
              <div className="w-14 h-14 rounded-md overflow-hidden">
                <Image src={comment.picture} width={460} height={460} />
              </div>

              <div className="flex-1">
                <ReactMarkdown children={comment.body} className="prose" />
              </div>
            </div>

            <p className="text-base font-normal">{`Posted by ${comment.name} on ${comment.date}`}</p>
          </div>
        ))}
      </div>

      <div className="p-2 bg-gray-200 rounded-md space-y-1">
        <div className={`p-2 bg-white rounded ${styles.markdown}`}>
          <Tabs>
            <TabList>
              <Tab>Write</Tab>
              <Tab>Preview</Tab>
            </TabList>

            <TabPanel>
              <textarea
                id="body"
                name="body"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.body}
                className="w-full h-auto rounded-md"
                rows={7}
                disabled={formik.isSubmitting}
              />
            </TabPanel>
            <TabPanel>
              <ReactMarkdown children={formik.values.body} className="prose" />
            </TabPanel>
          </Tabs>
        </div>

        <div className="flex flex-row items-center text-sm">
          <FaMarkdown className="mr-2" />
          {" Markdown is supported"}
        </div>

        <div className="flex flex-row items-center space-x-4">
          {userLoaded && (
            <div className="w-14 h-14 rounded-md overflow-hidden">
              <Image src={user.photoURL} width={460} height={460} />
            </div>
          )}

          <div className="flex flex-1 flex-row items-center">
            {userLoaded ? (
              <div>
                <p className="text-lg font-medium">
                  Commenting as{" "}
                  <span className="font-bold">{user.displayName}</span>
                </p>

                <button onClick={handleSignout} disabled={formik.isSubmitting}>
                  Sign out?
                </button>
              </div>
            ) : (
              <div className="flex flex-row items-center h-14">
                <button
                  onClick={() => handleLogin("github")}
                  className="text-4xl"
                >
                  <FaGithub />
                </button>
              </div>
            )}
          </div>

          <button
            className="p-2 text-white bg-green-600 rounded-md"
            disabled={!userLoaded || formik.isSubmitting}
            type="submit"
            onClick={() => formik.handleSubmit()}
          >
            {userLoaded ? "Comment" : "Sign in to comment"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentList;
