import React from "react";

export const onRenderBody = (
  { setPostBodyComponents },
  { googleAdClientId }
) => {
  if (process.env.NODE_ENV !== `production`) {
    return null;
  }

  if (googleAdClientId === undefined) {
    console.warn("googleAdClientId is not set");
  }

  return setPostBodyComponents([
    <script
      key={`gatsby-plugin-adsense`}
      data-ad-client={googleAdClientId}
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
    />,
  ]);
};
