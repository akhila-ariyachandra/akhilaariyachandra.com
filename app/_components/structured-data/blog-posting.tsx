import { PRODUCTION_URL } from "@/_lib/constants";
import dayjs from "dayjs";
import { type BlogPosting, type WithContext } from "schema-dts";

const BlogPostingStructuredData = ({
  title,
  description,
  content,
  posted,
  updated,
}: {
  title: string;
  description?: string;
  content?: string;
  posted: string;
  updated?: string;
}) => {
  const jsonLd: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    articleBody: content,
    datePublished: dayjs(posted).toISOString(),
    dateModified: updated ? dayjs(updated).toISOString() : undefined,
    author: [
      {
        "@type": "Person",
        name: "Akhila Ariyachandra",
        url: PRODUCTION_URL,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line @eslint-react/dom/no-dangerously-set-innerhtml
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default BlogPostingStructuredData;
