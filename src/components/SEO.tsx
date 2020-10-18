import config from "src/config";
import { FunctionComponent } from "react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

type Props = {
  title?: string;
  description?: string;
  image?: string;
};

const SEO: FunctionComponent<Props> = ({ title, description, image }) => {
  const router = useRouter();

  const titleTemplate = router.asPath === "/" ? "%s" : `%s | ${config.title}`;

  return (
    <NextSeo
      title={title}
      titleTemplate={titleTemplate}
      description={description}
      canonical={`${config.siteUrl}${router.asPath}`}
      openGraph={{ images: [{ url: `${config.siteUrl}${image}` }] }}
    />
  );
};

SEO.defaultProps = {
  title: config.title,
  description: config.description,
  image: "/cover-pic.jpg",
};

export default SEO;
