import config from "@/lib/config";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import type { FunctionComponent } from "react";

type Props = {
  title?: string;
  description?: string;
  image?: string;
  date?: Date;
  updated?: Date;
};

const SEO: FunctionComponent<Props> = ({
  title = config.title,
  description = config.description,
  image = "/cover-pic.jpg",
  date,
  updated,
}) => {
  const router = useRouter();

  const titleTemplate = router.asPath === "/" ? "%s" : `%s | ${config.title}`;

  const ogArticle = {};
  if (date) {
    ogArticle["publishedTime"] = date;
    if (updated) {
      ogArticle["modifiedTime"] = updated;
    }
    ogArticle["authors"] = [config.author.name];
  }

  return (
    <NextSeo
      title={title}
      titleTemplate={titleTemplate}
      description={description}
      canonical={`${config.siteUrl}${router.asPath}`}
      openGraph={{
        type: date ? "article" : "website",
        images: [{ url: `${config.siteUrl}${image}` }],
        article: ogArticle,
      }}
      twitter={{
        cardType: "summary_large_image",
        handle: config.author.twitter,
      }}
    />
  );
};

export default SEO;
