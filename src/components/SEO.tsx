import React from "react";
import { Helmet } from "react-helmet";

type Meta = {
  name?: string;
  property?: string;
  content: string;
};

type Props = {
  title?: string;
  description?: string;
  image?: string;
  meta?: Meta[];
  lang?: string;
};

const SEO: React.FunctionComponent<Props> = ({
  title,
  description,
  image,
  meta,
  lang,
}) => {
  const titleTemplate =
    title == process.env.title ? "%s" : `%s | ${process.env.title}`;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={titleTemplate}
      meta={[
        {
          name: "description",
          content: description,
        },
        {
          property: "og:title",
          content: title,
        },
        {
          property: "og:description",
          content: description,
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:image",
          content: image,
        },
        {
          name: "twitter:card",
          content: "summary",
        },
        {
          name: "twitter:creator",
          content: process.env.author,
        },
        {
          name: "twitter:title",
          content: title,
        },
        {
          name: "twitter:description",
          content: description,
        },
        {
          property: "twitter:image",
          content: image,
        },
        ...meta,
      ]}
    />
  );
};

SEO.defaultProps = {
  title: process.env.title,
  description: process.env.description,
  image: `${process.env.siteUrl}/profile.jpg`,
  meta: [],
  lang: "en",
};

export default SEO;
