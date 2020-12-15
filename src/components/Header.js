import Link from "next/link";
import config from "src/config";
import useBoop from "src/hooks/use-boop";
import { FaSun, FaMoon } from "react-icons/fa";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { animated } from "react-spring";

import styles from "src/components/Header.module.scss";

const Header = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [style, trigger] = useBoop({ rotation: 20, timing: 200 });

  const handleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <header
      className={`sticky top-0 transition-colors duration-200 z-40 full-bleed wrapper bg-white dark:bg-gray-900 bg-opacity-10 ${styles.header}`}
    >
      <div className="flex flex-row-reverse justify-between items-center p-4">
        <animated.button
          onClick={handleTheme}
          className="text-xl focus:outline-none text-black dark:text-white"
          aria-label="Theme Switcher"
          style={style}
          onMouseEnter={trigger}
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </animated.button>

        {router.asPath !== "/" ? (
          <Link href="/">
            <a className="text-xl font-medium leading-5 text-green-700 dark:text-green-600">
              {config.title}
            </a>
          </Link>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
