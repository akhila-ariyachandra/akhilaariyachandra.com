import config from "@/lib/config";
import Head from "next/head";
import { useRouter } from "next/router";
import type { FC } from "react";

type Props = {
  title?: string;
  description?: string;
  image?: string;
  date?: Date;
  updated?: Date;
};

const SEO: FC<Props> = ({
  title = config.title,
  description = config.description,
  image = "/cover-pic.jpg",
  date,
  updated,
}) => {
  const router = useRouter();

  const formattedTitle =
    router.asPath === "/" ? title : `${title} | ${config.title}`;

  return (
    <Head>
      <title>{formattedTitle}</title>
      <meta property="og:title" content={formattedTitle} />

      <meta name="description" content={description} />
      <meta property="og:description" content={description} />

      <link rel="canonical" href={`${config.siteUrl}${router.asPath}`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={config.author.twitter} />

      <meta property="og:type" content={date ? "article" : "website"} />
      <meta property="og:image" content={`${config.siteUrl}${image}`} />

      {/* Add article data if date prop has been passed i.e. blog posts */}
      {!!date && (
        <>
          <meta property="article:author" content={config.author.name} />
          <meta property="article:published_time" content={date.toString()} />
          {!!updated && (
            <meta
              property="article:modified_time"
              content={updated.toString()}
            />
          )}
        </>
      )}
    </Head>
  );
};

export default SEO;
