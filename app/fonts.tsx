"use client";
// Taken and adjusted from https://github.com/vercel/next.js/discussions/42023

import type { FC } from "react";
import { Sora, Roboto_Slab as RobotoSlab } from "@next/font/google";

const sora = Sora({
  display: "swap",
  subsets: ["latin"],
});
const robotoSlab = RobotoSlab({
  display: "swap",
  subsets: ["latin"],
});

/**
 * Adds custom fonts from @next/font to Tailwind CSS
 * through global CSS Variables
 */
const Fonts: FC = () => {
  return (
    <style jsx global>{`
      :root {
        --sora-font: ${sora.style.fontFamily};
        --roboto-slab-font: ${robotoSlab.style.fontFamily};
      }
    `}</style>
  );
};

export default Fonts;
