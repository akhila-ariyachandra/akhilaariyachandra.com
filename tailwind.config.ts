import typography from "@tailwindcss/typography";
import scrollbar from "tailwind-scrollbar";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx,css}",
    "./app/**/*.{js,ts,jsx,tsx,mdx,css}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        display: ["var(--font-geist-mono)"],
        content: ["var(--font-geist-sans)"],
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-6deg)" },
          "50%": { transform: "rotate(6deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 200ms ease-in-out 2",
      },
      transitionProperty: {
        height: "height",
      },
    },
  },
  plugins: [typography, scrollbar],
};

export default config;
