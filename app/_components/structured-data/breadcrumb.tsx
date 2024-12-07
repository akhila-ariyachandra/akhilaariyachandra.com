import { PRODUCTION_URL } from "@/_lib/constants";
import { BreadcrumbList, WithContext } from "schema-dts";

const BreadcrumbStructuredData = ({
  items,
}: {
  items: { name: string; route: `/${string}` }[];
}) => {
  const jsonLd: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${PRODUCTION_URL}${item.route}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default BreadcrumbStructuredData;
