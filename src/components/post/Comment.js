import { createRef, useEffect } from "react";

const Comment = () => {
  const commentBox = createRef();

  useEffect(() => {
    const scriptEl = document.createElement("script");
    scriptEl.async = true;
    scriptEl.src = "https://utteranc.es/client.js";
    scriptEl.setAttribute("repo", process.env.NEXT_PUBLIC_UTTERANCES_REPO);
    scriptEl.setAttribute("issue-term", "title");
    scriptEl.setAttribute("id", "utterances");
    scriptEl.setAttribute("theme", "github-light");
    scriptEl.setAttribute("crossorigin", "anonymous");
    if (commentBox?.current) {
      commentBox.current.appendChild(scriptEl);
    } else {
      console.log(`Error adding utterances comments on: ${commentBox}`);
    }
  }, []);

  return (
    <div
      ref={commentBox}
      className="bg-white p-2 m-4 sm:rounded-lg full-bleed max-w-screen-sm mx-auto"
    />
  );
};

export default Comment;
