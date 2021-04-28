import React from "react";
import styled from "styled-components";
import { useTheme } from "next-themes";
import { HeaderMountedContext } from "@/context/HeaderMountedContext";

/**
 * Based off of gatsby-theme-novela
 * https://github.com/narative/gatsby-theme-novela/blob/master/%40narative/gatsby-theme-novela/src/components/Navigation/Navigation.Header.tsx
 */

const ThemeButton = styled.button`
  opacity: 0.5;
  position: relative;
  border-radius: 5px;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

const ThemeButtonPlaceholder = styled.div`
  border-radius: 5px;
  width: 42px;
  height: 42px;
  visibility: hidden;
`;

const MoonOrSun = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: ${({ isDark }) => (isDark ? "4px" : "2px")} solid;
  border-color: ${({ color }) => color};
  background: ${({ color }) => color};
  transform: scale(${({ isDark }) => (isDark ? 0.5 : 1)});
  transition: all 0.45s ease;
  overflow: ${({ isDark }) => (isDark ? "visible" : "hidden")};

  &:before {
    content: "";
    position: absolute;
    right: -9px;
    top: -9px;
    height: 20px;
    width: 20px;
    border: 2px solid;
    border-color: ${({ color }) => color};
    border-radius: 50%;
    transform: translate(${({ isDark }) => (isDark ? "14px, -14px" : "0, 0")});
    opacity: ${({ isDark }) => (isDark ? 0 : 1)};
    transition: transform 0.45s ease;
  }

  &:after {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin: -4px 0 0 -4px;
    position: absolute;
    top: 50%;
    left: 50%;
    box-shadow: ${({
      color,
    }) => `0 -23px 0 ${color}, 0 23px 0 ${color}, 23px 0 0 ${color},
      -23px 0 0 ${color}, 15px 15px 0 ${color}, -15px 15px 0 ${color},
      15px -15px 0 ${color}, -15px -15px 0 ${color}`};
    transform: scale(${({ isDark }) => (isDark ? 1 : 0)});
    transition: all 0.35s ease;
  }
`;

const MoonMask = styled.div`
  position: absolute;
  right: 4px;
  top: 4px;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  border: 0;
  background: ${({ maskColor }) => maskColor};
  transform: translate(${({ isDark }) => (isDark ? "4px, -4px" : "0, 0")});
  opacity: ${({ isDark }) => (isDark ? 0 : 1)};
  transition: transform 0.45s ease;
`;

const ThemeSwitch = (): JSX.Element => {
  const mounted = React.useContext(HeaderMountedContext);
  const { theme, setTheme } = useTheme();

  if (!mounted) {
    return <ThemeButtonPlaceholder />;
  }

  const isDark = theme === "dark";
  const color = isDark ? "hsl(220, 13%, 91%)" : "hsl(215, 28%, 17%)";
  const maskColor = isDark ? "hsl(221, 39%, 11%)" : "hsl(0, 0%, 100%)";
  return (
    <ThemeButton
      type="button"
      aria-label="Toggle Dark Mode"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="dark:bg-gray-900 bg-white"
    >
      <MoonOrSun isDark={isDark} color={color} />
      <MoonMask isDark={isDark} maskColor={maskColor} />
    </ThemeButton>
  );
};

export default ThemeSwitch;
