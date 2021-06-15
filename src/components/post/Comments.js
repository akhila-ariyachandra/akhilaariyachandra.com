import React, { createRef, useState } from "react";
import Head from "next/head";

const Comments = () => {
  const commentBox = createRef();
  const [hasLoaded, setHasLoaded] = useState(false);

  React.useEffect(() => {
    if (!hasLoaded) {
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
        setHasLoaded(true);
      } else {
        console.log(`Error adding utterances comments on: ${commentBox}`);
      }
    }
  }, [commentBox, hasLoaded]);

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

      <div className="md-full-bleed my-6 p-2 bg-white" ref={commentBox} />
    </React.Fragment>
  );
};

export default Comments;
