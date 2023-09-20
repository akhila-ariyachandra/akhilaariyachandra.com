"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useRef } from "react";

import { GA_TRACKING_ID, pageview } from "@/lib/analytics";

const GoogleAnalytics = () => {
  const pathname = usePathname();
  const mountedRef = useRef(false);

  useEffect(() => {
    if (!mountedRef.current) {
      // Don't manually track first load
      mountedRef.current = true;
    } else {
      pageview(pathname);
    }
  }, [pathname]);

  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script id="google-analytics-script">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
  
        gtag('config', '${GA_TRACKING_ID}');
        `}</Script>
    </>
  );
};

export default GoogleAnalytics;
