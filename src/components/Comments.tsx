"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";

const Comments = () => {
  const { resolvedTheme } = useTheme();

  return (
    <Giscus
      id="comments"
      repo="akhila-ariyachandra/akhilaariyachandra.com"
      repoId="R_kgDOGUckVg"
      category="General"
      categoryId="DIC_kwDOGUckVs4ClF_X"
      mapping="pathname"
      term="Welcome to @giscus/react component!"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={resolvedTheme === "light" ? "light" : "dark"}
      lang="en"
      loading="lazy"
    />
  );
};

export default Comments;