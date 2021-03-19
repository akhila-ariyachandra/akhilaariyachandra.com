import config from "lib/config";
import { NextSeo } from "next-seo";

const SEO = () => (
  <NextSeo
    title={`Open Graph Image generator | ${config.title}`}
    description={`og:image generator for ${config.siteUrl}`}
    nofollow={true}
    noindex={true}
    additionalLinkTags={[
      { rel: "icon", type: "image/png", href: "/favicon.png" },
    ]}
  />
);

export default SEO;
