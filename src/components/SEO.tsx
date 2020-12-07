import config from "src/config";
import { FunctionComponent } from "react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

type Props = {
  title?: string;
  description?: string;
  image?: string;
  skipIndex?: boolean;
};

const SEO: FunctionComponent<Props> = ({
  title,
  description,
  image,
  skipIndex,
}) => {
  const router = useRouter();

  const titleTemplate = router.asPath === "/" ? "%s" : `%s | ${config.title}`;

  return (
    <NextSeo
      title={title}
      titleTemplate={titleTemplate}
      description={description}
      canonical={`${config.siteUrl}${router.asPath}`}
      openGraph={{
        type: "website",
        images: [{ url: `${config.siteUrl}${image}` }],
      }}
      additionalMetaTags={[
        {
          name: "monetization",
          content: process.env.NEXT_PUBLIC_ILP_PAYMENT_POINTER,
        },
      ]}
      noindex={skipIndex}
      nofollow={skipIndex}
    />
  );
};

SEO.defaultProps = {
  title: config.title,
  description: config.description,
  image: "/cover-pic.jpg",
  skipIndex: false,
};

export default SEO;
