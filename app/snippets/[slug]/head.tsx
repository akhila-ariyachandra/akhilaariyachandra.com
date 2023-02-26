import config from "@/lib/config";
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

  const codeSnippet = allSnippets.find((post) => post.slug === slug);

  if (!codeSnippet) {
    // Don't render if snippet doesn't exist
    return null;
  }

  return (
    <SEO
      title={codeSnippet.title}
      description={codeSnippet.description}
      image={`${config.siteUrl}/snippets-cover.jpg`}
    />
  );
};

export default SnippetsPostHead;
