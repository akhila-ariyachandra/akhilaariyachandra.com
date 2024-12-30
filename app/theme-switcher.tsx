"use client";

import { Moon, Sun } from "lucide-react";
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
        <Moon className="size-4 sm:size-[1.125rem]" />
      ) : (
        <Sun className="size-4 sm:size-[1.125rem]" />
      )}

      <span className="sr-only">
        Switch to {resolvedTheme === "light" ? "dark" : "light"} mode
      </span>
    </button>
  );
};

export default ThemeSwitcher;
