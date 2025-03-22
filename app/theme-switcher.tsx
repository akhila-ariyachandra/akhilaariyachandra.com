"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
    setIsMounted(true);
  }, []);

  const toggleTheme = () => {
    if (resolvedTheme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  if (!isMounted) {
    return (
      <button type="button" disabled className="size-4 sm:size-[1.125rem]">
        <span className="sr-only">Placeholder theme toggle button</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      className="text-zinc-700 dark:text-zinc-300"
      onClick={toggleTheme}
    >
      {resolvedTheme === "light" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="lucide lucide-moon size-4 sm:size-[1.125rem]"
          viewBox="0 0 24 24"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9"></path>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="lucide lucide-sun size-4 sm:size-[1.125rem]"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="4"></circle>
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
        </svg>
      )}

      <span className="sr-only">
        Switch to {resolvedTheme === "light" ? "dark" : "light"} mode
      </span>
    </button>
  );
};

export default ThemeSwitcher;
