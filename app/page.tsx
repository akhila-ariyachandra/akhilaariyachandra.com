import MDXComponent from "@/_components/mdx-component";
import profilePic from "@/public/profile-pic.png";
import { allAbouts } from "content-collections";
import Image from "next/image";
import { Suspense } from "react";
import Career from "./career";
import Skeleton from "@/_components/skeleton";

const HomePage = () => {
  const about = allAbouts[0];

  return (
    <>
      <Image
        src={profilePic}
        width={240}
        height={240}
        alt="A picture of Akhila Ariyachandra"
        className="mb-4 w-44 rounded sm:float-left sm:mb-5 sm:mr-5 sm:w-60 sm:rounded-lg"
        placeholder="blur"
      />

      <h1 className="mb-4 font-display text-3xl tracking-tighter text-zinc-600 dark:text-zinc-300 sm:mb-5 sm:text-4xl">
        Hi, I&apos;m{" "}
        <span className="font-black text-green-700 dark:text-green-500">
          Akhila Ariyachandra
        </span>
      </h1>

      {!!about && <MDXComponent mdx={about.mdx} />}

      <hr className="my-7 sm:my-8" />

      <Suspense fallback={<Skeleton className="h-[1120px] sm:h-[1275px]" />}>
        <Career />
      </Suspense>
    </>
  );
};

export default HomePage;
