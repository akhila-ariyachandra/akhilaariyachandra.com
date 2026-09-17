import CommonLayout from "@/_components/common-layout";
import Title from "@/_components/title";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import confusedTravolta from "./confused-travolta.gif";
import "./global-not-found-styles.css";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

const GlobalNotFound = () => {
  return (
    <CommonLayout>
      <section className="neobrutalism-container p-3 sm:p-4">
        <Title>Not Found</Title>

        <p className="text-base sm:text-lg">
          {"You have reached a page that doesn't exist. "}
          <Link
            href="/"
            className="font-semibold text-accent hover:underline dark:text-accent-dark"
          >
            Return Home
          </Link>
        </p>

        <Image
          src={confusedTravolta}
          alt="John Travolta confused in Pulp Fiction"
          className="mt-9 rounded-sm border-2 border-black shadow-neobrutalism sm:mt-10 sm:rounded-md"
          priority
          unoptimized
        />
      </section>
    </CommonLayout>
  );
};

export default GlobalNotFound;
