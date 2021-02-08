import React from "react";
import splitbee from "src/lib/splitbee";
import Link from "next/link";
import config from "src/config";
import useBoop from "src/hooks/use-boop";
import { FaSun, FaMoon, FaCircle } from "react-icons/fa";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { animated } from "react-spring";

import styles from "src/components/Header.module.scss";

const Header = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [style, trigger] = useBoop({ rotation: 20, timing: 200 });
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleTheme = () => {
    if (theme === "light") {
      splitbee.track("Change Theme", { type: "Dark" });
      setTheme("dark");
    } else {
      splitbee.track("Change Theme", { type: "Light" });
      setTheme("light");
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 full-bleed wrapper bg-white dark:bg-gray-900 bg-opacity-10 ${styles.header}`}
    >
      <div className="flex flex-row-reverse items-center justify-between p-4">
        <animated.button
          onClick={handleTheme}
          className="dark:text-gray-200 text-gray-800 text-xl focus:outline-none"
          aria-label="Theme Switcher"
          style={style}
          onMouseEnter={trigger}
        >
          {!hasMounted ? (
            <FaCircle />
          ) : theme === "light" ? (
            <FaMoon />
          ) : (
            <FaSun />
          )}
        </animated.button>

        {router.asPath !== "/" ? (
          <Link href="/">
            <a className="dark:text-green-600 text-green-700 text-xl font-medium leading-5">
              {config.title}
            </a>
          </Link>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
