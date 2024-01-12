import Title from "@/_components/title";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import confusedTravolta from "./confused-travolta.gif";

export const metadata: Metadata = {
  title: "404",
  description: "Not Found",
};

const NotFound = () => {
  return (
    <>
      <Title>Not Found</Title>

      <p className="text-sm text-zinc-700 sm:text-base dark:text-zinc-300">
        {"You have reached a page that doesn't exist. "}
        <Link
          href="/"
          className="font-medium text-green-700 hover:underline dark:text-green-500"
        >
          Return Home
        </Link>
      </p>

      <Image
        src={confusedTravolta}
        alt="John Travolta confused in Pulp Fiction"
        className="my-9 rounded sm:my-10 sm:rounded-md"
        unoptimized
      />
    </>
  );
};

export default NotFound;
