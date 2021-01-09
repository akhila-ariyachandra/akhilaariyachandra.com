import React from "react";
import Head from "next/head";

const Comment = () => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="full-bleed m-4 mx-auto p-2 max-w-screen-sm bg-white sm:rounded-lg">
      <Head>
        <link rel="preload" href="https://utteranc.es/client.js" as="script" />
      </Head>

      {mounted ? (
        <script
          src="https://utteranc.es/client.js"
          repo={process.env.NEXT_PUBLIC_UTTERANCES_REPO}
          issue-term="title"
          id="utterances"
          theme="github-light"
          crossorigin="anonymous"
          async
        />
      ) : null}
    </div>
  );
};

export default Comment;
