"use client";

import Giscus from "@giscus/react";

const Comments = () => {
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
      theme="light"
      lang="en"
      loading="lazy"
    />
  );
};

export default Comments;
