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

  return (
    <SEO
      title={codeSnippet.title}
      description={codeSnippet.description}
      image="/snippets-cover.jpg"
    />
  );
};

export default SnippetsPostHead;
