import React from "react";
import AdSense from "react-adsense";

const BlogAd = () => {
  return (
    <AdSense.Google
      style={{ display: "block" }}
      client={process.env.GOOGLE_AD_CLIENT}
      slot={process.env.GOOGLE_AD_SLOT}
      format="auto"
      responsive="true"
      className="my-3"
    />
  );
};

export default BlogAd;
