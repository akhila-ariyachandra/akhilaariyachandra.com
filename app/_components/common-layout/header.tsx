"use client";

import { sendGAEvent } from "@next/third-parties/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Header = () => {
  const pathname = usePathname();

  const [clientPathname, setClientPathname] = useState("");

  // This is to prevent hydration mismatches, https://nextjs.org/docs/app/api-reference/functions/use-pathname#avoid-hydration-mismatch-with-rewrites
  useEffect(() => {
    // eslint-disable-next-line @eslint-react/set-state-in-effect
    setClientPathname(pathname);
  }, [pathname]);

  return (
    <header>
      <aside className="bg-yellow-50 p-3 sm:p-4 dark:bg-yellow-950">
        <p className="mx-auto max-w-4xl text-sm text-zinc-600 sm:text-base dark:text-zinc-300">
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

      <nav className="mx-auto flex w-full max-w-4xl items-center gap-4 p-3 text-base font-medium text-zinc-600 sm:mt-40 sm:p-4 sm:text-lg dark:text-zinc-300">
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
    </header>
  );
};

export default Header;
