import React from "react";
import Head from "next/head";

const Comments = () => {
  const commentBox = React.createRef();

  React.useEffect(() => {
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
  }, []);

  return (
    <React.Fragment>
      <Head>
        <link
          rel="preconnect"
          href="https://utteranc.es/client.js"
          as="script"
          crossOrigin
        />
      </Head>

      <div
        className="full-bleed mx-auto my-6 p-2 max-w-screen-md bg-white md:rounded-lg"
        ref={commentBox}
      />
    </React.Fragment>
  );
};

export default Comments;
