import React from "react";
import AdSense from "react-adsense";

type Props = {
  className?: string;
};

const BlogAd: React.FunctionComponent<Props> = ({ className }) => {
  return (
    <AdSense.Google
      client="ca-pub-9764216594022086"
      slot="2810783403"
      style={{ display: "block" }}
      format="auto"
      responsive="true"
      className={className}
    />
  );
};

BlogAd.defaultProps = {
  className: "",
};

export default BlogAd;
