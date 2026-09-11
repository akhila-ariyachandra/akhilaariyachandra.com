"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Suspense, use } from "react";
import { browser } from "react-dom";
import { FaMoon, FaSun } from "react-icons/fa6";
import { buttonVariants } from "../button";

const Header = () => {
  return (
    <header className="mx-auto w-full max-w-4xl p-3 sm:p-4">
      <div className="neobrutalism-container flex flex-row items-center justify-between p-3 sm:p-4">
        <nav className="flex flex-row items-center gap-4 text-base font-semibold sm:text-lg">
          <Link href="/" className={buttonVariants()}>
            Home
          </Link>

          <Link href="/blog" className={buttonVariants()}>
            Blog
          </Link>
        </nav>

        <Suspense
          fallback={
            <button
              type="button"
              className="invisible size-7.5 sm:size-10"
              disabled
            >
              <span className="sr-only">Theme toggle</span>
            </button>
          }
        >
          <ThemeToggle />
        </Suspense>
      </div>
    </header>
  );
};

export default Header;

const ThemeToggle = () => {
  use(browser());

  const { resolvedTheme, setTheme } = useTheme();

  const themeToggle = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
    sendGAEvent("event", "themeToggled");
  };

  return (
    <button
      type="button"
      className={buttonVariants({
        className: "p-1 text-lg/none sm:p-2 sm:text-xl/none",
      })}
      onClick={themeToggle}
    >
      {resolvedTheme === "light" ? <FaMoon /> : <FaSun />}

      <span className="sr-only">
        {resolvedTheme === "light" ? "Dark mode" : "Light mode"}
      </span>
    </button>
  );
};
