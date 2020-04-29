import Terser from "terser";
import { COLORS } from "./src/lib/colors";

const googleAdClientId = "ca-pub-9764216594022086";

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

export const onRenderBody = ({
  setHeadComponents,
  setPreBodyComponents,
  setPostBodyComponents,
}) => {
  const minfiedCode = Terser.minify(codeToRunOnClient).code;

  setPreBodyComponents(<MagicScriptTag script={minfiedCode} />);

  // Add AdSense script
  if (process.env.NODE_ENV === `production`) {
    // Preconnect
    setHeadComponents([
      <link
        rel="preconnect"
        href="https://adservice.google.com/"
        key="adservice-preconnect"
      />,
      <link
        rel="preconnect"
        href="https://googleads.g.doubleclick.net/"
        key="doubleclick-preconnect"
      />,
      <link
        rel="preconnect"
        href="https://www.googletagservices.com/"
        key="googletagservices-preconnect"
      />,
      <link
        rel="preconnect"
        href="https://tpc.googlesyndication.com/"
        key="googlesyndication-preconnect"
      />,
    ]);

    const script = `
      (adsbygoogle = window.adsbygoogle || []).push({
        google_ad_client: "${googleAdClientId}",
        enable_page_level_ads: true
      });
    `;
    const minifiedScript = Terser.minify(script).code;

    setPostBodyComponents([
      <script
        key="google-adsense-script"
        async
        type="text/javascript"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      />,
      <script
        key={`google-adsense`}
        dangerouslySetInnerHTML={{
          __html: minifiedScript,
        }}
      />,
    ]);
  }
};
