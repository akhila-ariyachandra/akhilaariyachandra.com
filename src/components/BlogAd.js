import React from "react";
import AdSense from "react-adsense";
import {
  IfWebMonetized,
  IfNotWebMonetized,
  IfWebMonetizationPending,
} from "react-web-monetization";
import { OutboundLink } from "gatsby-plugin-google-analytics";

const BlogAd = () => {
  return (
    <React.Fragment>
      <IfWebMonetized>
        <div className="web-monetization-banner">
          <h4>Thank you for supporting me with Web Monetization!</h4>
        </div>
      </IfWebMonetized>

      <IfWebMonetizationPending>
        <div className="web-monetization-banner">
          <h4>Web Monetization is pending!</h4>
        </div>
      </IfWebMonetizationPending>

      <IfNotWebMonetized>
        <div className="web-monetization-banner">
          <h4>
            Sign up for{" "}
            <OutboundLink
              href="https://coil.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Coil
            </OutboundLink>{" "}
            to support this site and disable Ads!
          </h4>
        </div>

        <AdSense.Google
          style={{ display: "block" }}
          client={process.env.GATSBY_GOOGLE_AD_CLIENT}
          slot={process.env.GATSBY_GOOGLE_AD_SLOT}
          format="auto"
          responsive="true"
          className="my-3"
        />
      </IfNotWebMonetized>
    </React.Fragment>
  );
};

export default BlogAd;
