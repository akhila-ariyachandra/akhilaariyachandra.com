import { PRODUCTION_URL } from "../../lib/constants";
import { type BreadcrumbList, type WithContext } from "schema-dts";

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
      // eslint-disable-next-line @eslint-react/dom/no-dangerously-set-innerhtml
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default BreadcrumbStructuredData;
