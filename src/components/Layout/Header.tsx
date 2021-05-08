import React from "react";
import config from "@/lib/config";
import Link from "next/link";
import ThemeSwitch from "@/components/Layout/ThemeSwitch";
import { useRouter } from "next/router";

const Header: React.FunctionComponent = () => {
  const router = useRouter();

  return (
    <header className="full-bleed wrapper sticky z-40 top-0 dark:bg-gray-900 bg-white bg-opacity-10 backdrop-blur-xl backdrop-filter">
      <div className="flex flex-row-reverse items-center justify-between p-4">
        <ThemeSwitch />

        {router.asPath !== "/" ? (
          <Link href="/">
            <a className="dark:text-green-600 text-green-700 text-xl font-bold leading-5 sm:text-2xl">
              {config.title}
            </a>
          </Link>
        ) : null}
      </div>
    </header>
  );
};

export default React.memo(Header);
