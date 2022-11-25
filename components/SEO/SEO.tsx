"use client";

import config from "@/lib/config";
import type { FC } from "react";
import { usePathname } from "next/navigation";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  date?: string;
  updated?: string;
}

const SEO: FC<SEOProps> = ({
  title = config.title,
  description = config.description,
  image = "/cover-pic.jpg",
  date,
  updated,
}) => {
  const pathname = usePathname();

  const formattedTitle =
    pathname === "/" ? title : `${title} | ${config.title}`;

  return (
    <>
      <title>{formattedTitle}</title>
      <meta property="og:title" content={formattedTitle} />

      <meta name="description" content={description} />
      <meta property="og:description" content={description} />

      <link rel="canonical" href={`${config.siteUrl}${pathname}`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={config.author.twitter} />

      <meta property="og:type" content={date ? "article" : "website"} />
      <meta property="og:image" content={`${config.siteUrl}${image}`} />

      {/* Add article data if date prop has been passed i.e. blog posts */}
      {!!date && (
        <>
          <meta property="article:author" content={config.author.name} />
          <meta property="article:published_time" content={date} />

          {!!updated && (
            <meta property="article:modified_time" content={updated} />
          )}
        </>
      )}
    </>
  );
};

export default SEO;
