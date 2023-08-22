"use client";

import { useSession, signIn } from "next-auth/react";
import { cn } from "@/lib/helpers";
import { FaGithub } from "react-icons/fa";

const LoginButton = () => {
  const { status } = useSession();

  if (status === "authenticated") {
    return null;
  }

  return (
    <button
      className={cn(
        "mx-auto my-5 flex w-full flex-row items-center justify-center gap-2 rounded px-3 py-2 font-display text-base font-medium leading-none sm:px-4 sm:py-3 sm:text-lg",
        "bg-[#181717] text-white dark:bg-white dark:text-[#181717]"
      )}
      onClick={() => signIn("github")}
      type="button"
    >
      <FaGithub />
      <span>Login with GitHub to continue</span>
    </button>
  );
};

export default LoginButton;
