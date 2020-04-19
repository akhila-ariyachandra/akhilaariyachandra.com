import React from "react";

export const onRenderBody = ({ setHeadComponents }, pluginOptions) => {
  return setHeadComponents([
    <script
      data-ad-client={process.env.GOOGLE_AD_CLIENT}
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
    />,
    <script
      key={`gatsby-plugin-google-adsense`}
      dangerouslySetInnerHTML={{
        __html: `
            (adsbygoogle = window.adsbygoogle || []).push({
                google_ad_client: ${process.env.GOOGLE_AD_CLIENT},
                enable_page_level_ads: true
            });
      `,
      }}
    />,
  ]);
};
