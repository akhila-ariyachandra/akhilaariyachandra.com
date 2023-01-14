import config from "@/lib/config";
import SEO from "@/components/SEO";
import type { FC } from "react";

const SnippetsHead: FC = () => {
  return (
    <SEO
      title="Code Snippets"
      description="A few pieces of code I've found useful"
      image={`${config.siteUrl}/snippets-cover.jpg`}
    />
  );
};

export default SnippetsHead;
