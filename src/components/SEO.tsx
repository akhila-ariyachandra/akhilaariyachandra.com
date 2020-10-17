import config from "src/config";
import { FunctionComponent } from "react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

type Props = {
  title?: string;
  description?: string;
};

const SEO: FunctionComponent<Props> = ({ title, description }) => {
  const router = useRouter();

  const titleTemplate = router.asPath === "/" ? "%s" : `%s | ${config.title}`;

  return (
    <NextSeo
      title={title}
      titleTemplate={titleTemplate}
      description={description}
      canonical={`${config.siteUrl}${router.asPath}`}
    />
  );
};

SEO.defaultProps = {
  title: config.title,
  description: config.description,
};

export default SEO;
