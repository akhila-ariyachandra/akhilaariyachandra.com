import { PRODUCTION_URL } from "@/_lib/constants";
import dayjs from "dayjs";
import { Article, WithContext } from "schema-dts";

const ArticleStructuredData = ({
  title,
  posted,
  updated,
}: {
  title: string;
  posted: string;
  updated?: string;
}) => {
  const jsonLd: WithContext<Article> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
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

export default ArticleStructuredData;
