import SEO from "@/components/SEO";
import type { FC } from "react";
import { allSnippets } from "contentlayer/generated";

interface SnippetsPostHeadProps {
  params: {
    slug: string;
  };
}

const SnippetsPostHead: FC<SnippetsPostHeadProps> = ({ params }) => {
  const slug = params?.slug.toString();

  const snippet = allSnippets.find((snippet) => snippet.slug === slug);

  return (
    <SEO
      title={snippet.title}
      description={snippet.description}
      image="/snippets-cover.jpg"
    />
  );
};

export default SnippetsPostHead;
