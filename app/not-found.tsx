import Link from "next/link";
import Title from "@/components/Title";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 | Akhila Ariyachandra",
  description: "Not Found",
};

const NotFound = () => {
  return (
    <>
      <Title>Not Found</Title>

      <p className="text-sm text-zinc-700 dark:text-zinc-300 sm:text-base">
        {"You have reached a route that does't exist. "}
        <Link
          href="/"
          className="font-medium text-green-700 hover:underline dark:text-green-500"
        >
          Return Home
        </Link>
      </p>
    </>
  );
};

export default NotFound;
