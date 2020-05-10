import React from "react";
import AdSense from "react-adsense";
import { IfNotWebMonetized } from "react-web-monetization";

const BlogAd = () => {
  return (
    <IfNotWebMonetized>
      <AdSense.Google
        style={{ display: "block" }}
        client={process.env.GATSBY_GOOGLE_AD_CLIENT}
        slot={process.env.GATSBY_GOOGLE_AD_SLOT}
        format="auto"
        responsive="true"
        className="my-3"
      />
    </IfNotWebMonetized>
  );
};

export default BlogAd;
