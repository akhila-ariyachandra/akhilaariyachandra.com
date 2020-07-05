import React from "react";
import Terser from "terser";
import { COLORS } from "./src/lib/colors";

let codeToRunOnClient = `
  (function() {
    function getInitialColorMode() {
      const persistedColorPreference =
      window.localStorage.getItem('color-mode');
    const hasPersistedPreference =
      typeof persistedColorPreference === 'string';
    // If the user has explicitly chosen light or dark,
    // let's use it. Otherwise, this value will be null.
    if (hasPersistedPreference) {
      return persistedColorPreference;
    }
    // If they haven't been explicit, let's check the media
    // query
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const hasMediaQueryPreference = typeof mql.matches === 'boolean';
    if (hasMediaQueryPreference) {
      return mql.matches ? 'dark' : 'light';
    }
    // If they are using a browser/OS that doesn't support
    // color themes, let's default to 'light'.
    return 'light';
    }

    const colorMode = getInitialColorMode();
    const root = document.documentElement;
    root.style.setProperty(
      '--color-text',
      colorMode === 'light'
        ? '${COLORS.light.text}'
        : '${COLORS.dark.text}'
    );
    root.style.setProperty(
      '--color-background',
      colorMode === 'light'
        ? '${COLORS.light.background}'
        : '${COLORS.dark.background}'
    );
    root.style.setProperty(
      '--color-primary',
      colorMode === 'light'
        ? '${COLORS.light.primary}'
        : '${COLORS.dark.primary}'
    );
    root.style.setProperty('--initial-color-mode', colorMode);
  })()`;

const MagicScriptTag = ({ script }) => {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
};

const FallbackStyles = () => {
  return (
    <style>
      {`
        html {
          --color-text: ${COLORS.dark.text};
          --color-background: ${COLORS.dark.background};
          --color-primary: ${COLORS.dark.primary};
        }
      `}
    </style>
  );
};

export const onRenderBody = ({ setHeadComponents, setPreBodyComponents }) => {
  setHeadComponents(<FallbackStyles key={`fallback-styles`} />);

  const minfiedCode = Terser.minify(codeToRunOnClient).code;

  setPreBodyComponents(
    <MagicScriptTag script={minfiedCode} key={`darkmode-script`} />
  );
};
