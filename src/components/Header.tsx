import Link from "next/link";
import config from "src/config";
import { FaSun, FaMoon } from "react-icons/fa";
import { FunctionComponent } from "react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";

const Header: FunctionComponent = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const handleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <header
      id="header"
      className="sticky top-0 transition-colors duration-200 z-40 full-bleed wrapper"
    >
      <div className="flex flex-row-reverse justify-between items-center p-4">
        <button
          onClick={handleTheme}
          className="text-xl sm:text-2xl focus:outline-none"
          aria-label="Theme Switcher"
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>

        {router.asPath !== "/" ? (
          <Link href="/">
            <a className="text-xl sm:text-2xl font-medium leading-5 sm:leading-6">
              {config.title}
            </a>
          </Link>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
