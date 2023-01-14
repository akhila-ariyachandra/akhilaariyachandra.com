"use client";

import config from "@/lib/config";
import type { FC } from "react";
import { usePathname } from "next/navigation";
import { NextSeo } from "next-seo";

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
  image = `${config.siteUrl}/cover-pic.jpg`,
  date,
  updated,
}) => {
  const pathname = usePathname();

  const titleTemplate = pathname === "/" ? "%s" : `%s | ${config.title}`;

  return (
    <NextSeo
      title={title}
      titleTemplate={titleTemplate}
      description={description}
      canonical={`${config.siteUrl}${pathname}`}
      twitter={{
        cardType: "summary_large_image",
        handle: config.author.twitter,
      }}
      openGraph={{
        type: date ? "article" : "website",
        images: [{ url: image, width: 1200, height: 630 }],
        article: !!date
          ? {
              authors: [config.author.name],
              publishedTime: date,
              modifiedTime: updated ?? undefined,
            }
          : undefined,
      }}
      useAppDir
    />
  );
};

export default SEO;
