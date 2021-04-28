import React from "react";
import config from "@/lib/config";
import Link from "next/link";
import ThemeSwitch from "@/components/Layout/ThemeSwitch";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";

import styles from "@/components/Layout/Header.module.scss";

const Header = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  return (
    <header
      className={`sticky top-0 z-40 full-bleed wrapper bg-white dark:bg-gray-900 bg-opacity-10 ${styles.header}`}
    >
      <div className="flex flex-row-reverse items-center justify-between p-4">
        <ThemeSwitch />

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
