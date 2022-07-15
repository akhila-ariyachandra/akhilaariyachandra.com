import { useTheme } from "next-themes";
import Head from "next/head";
import type { FC } from "react";
import { useEffect, useRef } from "react";

const Comments: FC = () => {
  const parentRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const parent = parentRef?.current;
    const script = document.createElement("script");

    script.setAttribute("src", "https://utteranc.es/client.js");
    script.setAttribute("repo", process.env.NEXT_PUBLIC_UTTERANCES_REPO);
    script.setAttribute("issue-term", "pathname");
    script.setAttribute(
      "theme",
      theme === "dark" ? "github-dark" : "github-light"
    );
    script.setAttribute("crossorigin", "anonymous");
    script.setAttribute("async", "true");

    parent?.appendChild(script);

    return () => {
      while (parent?.firstChild) {
        parent?.removeChild(parent?.lastChild);
      }
    };
  }, [theme, parentRef]);

  return (
    <>
      <Head>
        <link rel="preload" href="https://utteranc.es/client.js" as="script" />
      </Head>

      <div ref={parentRef} className="my-4" />
    </>
  );
};

export default Comments;
