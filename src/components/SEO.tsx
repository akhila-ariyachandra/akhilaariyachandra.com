import React from "react";
import { NextSeo } from "next-seo";

type Props = {
  title?: string;
  description?: string;
  image?: string;
  slug?: string;
};

const SEO: React.FunctionComponent<Props> = ({
  title,
  description,
  image,
  slug,
}) => {
  const titleTemplate =
    title == process.env.title ? "%s" : `%s | ${process.env.title}`;

  const url = slug ? `${process.env.siteUrl}/${slug}` : process.env.siteUrl;

  return (
    <NextSeo
      title={title}
      titleTemplate={titleTemplate}
      description={description}
      openGraph={{
        title,
        description,
        images: [{ url: image }],
        type: "website",
        url,
      }}
      twitter={{
        handle: process.env.handle,
        cardType: "summary",
      }}
    />
  );
};

SEO.defaultProps = {
  title: process.env.title,
  description: process.env.description,
  image: `${process.env.siteUrl}/profile.jpg`,
};

export default SEO;
