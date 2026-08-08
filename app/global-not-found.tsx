import CommonLayout from "@/_components/common-layout";
import Title from "@/_components/title";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import confusedTravolta from "./confused-travolta.gif";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

const GlobalNotFound = () => {
  return (
    <CommonLayout>
      <Title>Not Found</Title>

      <p className="text-sm text-zinc-700 sm:text-base dark:text-zinc-300">
        {"You have reached a page that doesn't exist. "}
        <Link
          href="/"
          className="text-accent dark:text-accent-dark font-medium hover:underline"
        >
          Return Home
        </Link>
      </p>

      <Image
        src={confusedTravolta}
        alt="John Travolta confused in Pulp Fiction"
        className="my-9 rounded-sm sm:my-10 sm:rounded-md"
        unoptimized
      />
    </CommonLayout>
  );
};

export default GlobalNotFound;
