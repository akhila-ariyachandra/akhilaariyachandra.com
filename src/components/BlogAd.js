import React from "react";
import AdSense from "react-adsense";

const BlogAd = () => {
  return (
    <AdSense.Google
      style={{ display: "block" }}
      client="ca-pub-9764216594022086"
      slot="2810783403"
      format="auto"
      responsive="true"
      className="my-3"
    />
  );
};

export default BlogAd;
