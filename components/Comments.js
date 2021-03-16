import React from "react";
import Head from "next/head";

const Comments = () => {
  const [visible, setVisible] = React.useState(false);
  const commentBox = React.createRef();

  const showComments = () => {
    setVisible(true);
  };

  React.useEffect(() => {
    if (visible) {
      const scriptEl = document.createElement("script");

      scriptEl.async = true;
      scriptEl.src = "https://utteranc.es/client.js";
      scriptEl.setAttribute("repo", process.env.NEXT_PUBLIC_UTTERANCES_REPO);
      scriptEl.setAttribute("issue-term", "og:title");
      scriptEl.setAttribute("label", "Comment");
      scriptEl.setAttribute("theme", "github-light");
      scriptEl.setAttribute("crossorigin", "anonymous");
      scriptEl.setAttribute("id", "utterances");

      if (commentBox && commentBox.current) {
        commentBox.current.appendChild(scriptEl);
      } else {
        console.log(`Error adding utterances comments on: ${commentBox}`);
      }
    }
  }, [visible]);

  return (
    <React.Fragment>
      <Head>
        <link
          rel="preload"
          href="https://utteranc.es/client.js"
          as="script"
          crossOrigin="true"
        />
      </Head>

      {visible ? (
        <div
          className="full-bleed mx-auto my-6 p-2 max-w-screen-md bg-white md:rounded-lg"
          ref={commentBox}
        />
      ) : (
        <button
          onClick={showComments}
          className="full-bleed mx-auto my-6 px-3 py-2 max-w-screen-md text-gray-50 text-lg font-medium bg-green-700 shadow-lg md:rounded-lg"
        >
          Show Comments
        </button>
      )}
    </React.Fragment>
  );
};

export default Comments;
