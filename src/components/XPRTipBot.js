import React from "react";
import { OutboundLink } from "gatsby-plugin-google-analytics";

export const TipButton = () => {
  return (
    <OutboundLink
      amount="1"
      size="275"
      unique="true"
      to="c36cbf06-4e08-4e6a-86a5-ad41169f05bb"
      network="coil"
      href="https://www.xrptipbot.com"
      target="_blank"
      rel="noreferrer"
    />
  );
};

export const TipScript = () => {
  return (
    <script
      async
      src="https://www.xrptipbot.com/static/donate/tipper.js"
      charset="utf-8"
    />
  );
};
