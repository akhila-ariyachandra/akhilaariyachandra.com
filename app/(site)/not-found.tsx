import Title from "@/_components/title";
import confusedTravolta from "@/videos/confused-travolta.mp4";
import type { Metadata } from "next";
import Video from "next-video";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

const NotFoundPage = () => {
  return (
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

      <Video
        src={confusedTravolta}
        className="mt-9 block aspect-1280/550! h-auto w-full rounded-sm border-2 border-black shadow-neobrutalism sm:mt-10 sm:rounded-md"
        poster={confusedTravolta.blurDataURL}
        controls={false}
        autoPlay
        loop
        muted
      />
    </section>
  );
};

export default NotFoundPage;
