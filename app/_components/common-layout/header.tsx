"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";

const Header = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line @eslint-react/set-state-in-effect
    setIsMounted(true);
  }, []);

  const themeToggle = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
    sendGAEvent("event", "themeToggled");
  };

  return (
    <>
      <aside className="theme-transition bg-yellow-50 dark:bg-yellow-950">
        <p className="mx-auto max-w-4xl p-3 text-sm text-zinc-600 sm:p-4 sm:text-base dark:text-zinc-300">
          <strong>Open to new opportunities: </strong> I&apos;m currently
          looking for my next opportunity and open to remote work in any
          timezone or hybrid opportunities in Colombo, Sri Lanka. I&apos;m a{" "}
          <strong>full-stack developer with 8+ years of experience</strong>{" "}
          building web applications with{" "}
          <strong>React, TypeScript, and Node.js</strong>, with a strong focus
          on performance, scalability, and maintainable architecture.{" "}
          <a
            href="/resume"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold hover:underline"
            onClick={() => {
              sendGAEvent("event", "resumeDownloaded");
            }}
          >
            View my resume →
          </a>{" "}
          or get in touch via{" "}
          <a
            href="https://www.linkedin.com/in/akhila-ariyachandra/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold hover:underline"
            onClick={() => {
              sendGAEvent("event", "linkedinClicked");
            }}
          >
            LinkedIn
          </a>{" "}
          or{" "}
          <a
            href="mailto:akhila_ariyachandra@live.com"
            className="font-bold hover:underline"
            onClick={() => {
              sendGAEvent("event", "emailClicked");
            }}
          >
            email
          </a>
          .
        </p>
      </aside>

      <header className="mx-auto w-full max-w-4xl p-3 sm:p-4">
        <div className="neobrutalism-container flex flex-row items-center justify-between p-3 sm:p-4">
          <nav className="flex flex-row items-center gap-4 text-base font-semibold sm:text-lg">
            <Link href="/">Home</Link>

            <Link href="/blog">Blog</Link>
          </nav>

          {isMounted ? (
            <button
              type="button"
              className="neobrutalism-button cursor-pointer p-1 text-lg sm:p-2 sm:text-xl"
              onClick={themeToggle}
            >
              {resolvedTheme === "light" ? <FaMoon /> : <FaSun />}

              <span className="sr-only">
                {resolvedTheme === "light" ? "Dark mode" : "Light mode"}
              </span>
            </button>
          ) : (
            <button
              type="button"
              className="invisible size-7.5 sm:size-10"
              disabled
            >
              <span className="sr-only">Theme toggle</span>
            </button>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
