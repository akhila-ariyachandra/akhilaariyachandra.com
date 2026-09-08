"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCircle, FaMoon, FaSun } from "react-icons/fa6";

const Header = () => {
  const pathname = usePathname();

  const [clientPathname, setClientPathname] = useState("");

  // This is to prevent hydration mismatches, https://nextjs.org/docs/app/api-reference/functions/use-pathname#avoid-hydration-mismatch-with-rewrites
  useEffect(() => {
    // eslint-disable-next-line @eslint-react/set-state-in-effect
    setClientPathname(pathname);
  }, [pathname]);

  const { resolvedTheme, setTheme } = useTheme();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line @eslint-react/set-state-in-effect
    setIsMounted(true);
  }, []);

  return (
    <header>
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

      <div className="mx-auto flex w-full max-w-4xl flex-row items-center justify-between p-3 sm:mt-40 sm:p-4">
        <nav className="flex items-center gap-4 text-base font-medium text-zinc-600 sm:text-lg dark:text-zinc-300">
          <Link
            href="/"
            data-active={clientPathname === "/" ? true : false}
            className="data-[active=true]:text-accent dark:data-[active=true]:text-accent-dark"
          >
            Home
          </Link>

          <Link
            href="/blog"
            data-active={clientPathname.startsWith("/blog") ? true : false}
            className="data-[active=true]:text-accent dark:data-[active=true]:text-accent-dark"
          >
            Blog
          </Link>
        </nav>

        {isMounted ? (
          <button
            type="button"
            className="cursor-pointer text-lg text-zinc-600 sm:text-xl dark:text-zinc-300"
            onClick={() => {
              setTheme(resolvedTheme === "dark" ? "light" : "dark");
            }}
          >
            {resolvedTheme === "light" ? <FaMoon /> : <FaSun />}

            <span className="sr-only">
              {resolvedTheme === "light" ? "Dark mode" : "Light mode"}
            </span>
          </button>
        ) : (
          <button
            type="button"
            className="text-lg text-zinc-600 sm:text-xl dark:text-zinc-300"
            disabled
          >
            <FaCircle />

            <span className="sr-only">Theme toggle</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
