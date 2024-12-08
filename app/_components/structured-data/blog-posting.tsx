import { PRODUCTION_URL } from "@/_lib/constants";
import dayjs from "dayjs";
import { Article, BlogPosting, WithContext } from "schema-dts";

const BlogPostingStructuredData = ({
  title,
  content,
  posted,
  updated,
}: {
  title: string;
  content: string;
  posted: string;
  updated?: string;
}) => {
  const jsonLd: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
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
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default BlogPostingStructuredData;
