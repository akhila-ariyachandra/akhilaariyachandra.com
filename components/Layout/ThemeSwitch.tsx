import { FC, useState, useEffect } from "react";
import { useTheme } from "next-themes";

/**
 * Based off of gatsby-theme-novela
 * https://github.com/narative/gatsby-theme-novela/blob/master/%40narative/gatsby-theme-novela/src/components/Navigation/Navigation.Header.tsx
 */

const ThemeSwitch: FC = () => {
  const [hasMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!hasMounted) {
    return (
      <>
        <style jsx>{`
          .themeButtonPlaceholder {
            border-radius: 5px;
            width: 42px;
            height: 42px;
            visibility: hidden;
          }
        `}</style>

        <div className="themeButtonPlaceholder" />
      </>
    );
  }

  const isDark = theme === "dark";
  const color = isDark ? "hsl(220, 13%, 91%)" : "hsl(215, 28%, 17%)";
  const maskColor = isDark ? "hsl(221, 39%, 11%)" : "hsl(0, 0%, 100%)";

  return (
    <>
      <style jsx>{`
        .themeButton {
          position: relative;
          border-radius: 5px;
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.3s ease;
        }

        .moonOrSun {
          position: relative;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: ${isDark ? "4px" : "2px"} solid;
          border-color: ${color};
          background: ${color};
          transform: scale(${isDark ? 0.5 : 1});
          transition: all 0.45s ease;
          overflow: ${isDark ? "visible" : "hidden"};
        }

        .moonOrSun:before {
          content: "";
          position: absolute;
          right: -9px;
          top: -9px;
          height: 20px;
          width: 20px;
          border: 2px solid;
          border-color: ${color};
          border-radius: 50%;
          transform: translate(${isDark ? "14px, -14px" : "0, 0"});
          opacity: ${isDark ? 0 : 1};
          transition: transform 0.45s ease;
        }

        .moonOrSun:after {
          content: "";
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin: -4px 0 0 -4px;
          position: absolute;
          top: 50%;
          left: 50%;
          box-shadow: 0 -23px 0 ${color}, 0 23px 0 ${color}, 23px 0 0 ${color},
            -23px 0 0 ${color}, 15px 15px 0 ${color}, -15px 15px 0 ${color},
            15px -15px 0 ${color}, -15px -15px 0 ${color};
          transform: scale(${isDark ? 1 : 0});
          transition: all 0.35s ease;
        }

        .moonMask {
          position: absolute;
          right: 4px;
          top: 4px;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          border: 0;
          background: ${maskColor};
          transform: translate(${isDark ? "4px, -4px" : "0, 0"});
          opacity: ${isDark ? 0 : 1};
          transition: transform 0.45s ease;
        }
      `}</style>

      <button
        type="button"
        aria-label="Toggle Dark Mode"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="themeButton bg-white dark:bg-gray-900"
      >
        <div className="moonOrSun" />
        <div className="moonMask" />
      </button>
    </>
  );
};

export default ThemeSwitch;
