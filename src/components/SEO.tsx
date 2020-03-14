import React from "react";
import Head from "next/head";

type Props = {
  title?: string;
};

const SEO: React.FunctionComponent<Props> = ({ title }) => {
  const formattedTitle = title
    ? `${title} | Akhila Ariyachandra`
    : "Akhila Ariyachandra";

  return (
    <Head>
      <title>{formattedTitle}</title>

      <link rel="icon" type="image/png" href="/icon.png" />
    </Head>
  );
};

export default SEO;
