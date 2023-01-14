import config from "@/lib/config";
import SEO from "@/components/SEO";
import { getCodeSnippet } from "@/utils/sanity";

interface SnippetsPostHeadProps {
  params: {
    slug: string;
  };
}

const SnippetsPostHead = async ({ params }: SnippetsPostHeadProps) => {
  const slug = params?.slug.toString();

  const codeSnippet = await getCodeSnippet(slug);

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
