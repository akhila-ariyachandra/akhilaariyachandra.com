import MDXComponent from "@/_components/mdx-component";
import BreadcrumbStructuredData from "@/_components/structured-data/breadcrumb";
import ProfileStructuredData from "@/_components/structured-data/profile";
import profilePic from "@/public/profile-pic.png";
import { allAbouts } from "content-collections";
import Image from "next/image";

const HomePage = () => {
  const about = allAbouts[0];

  return (
    <>
      <Image
        src={profilePic}
        width={240}
        height={240}
        alt="A picture of Akhila Ariyachandra"
        className="mb-4 w-44 rounded-sm sm:float-left sm:mr-5 sm:mb-5 sm:w-60 sm:rounded-lg"
        placeholder="blur"
      />

      <h1 className="font-display mb-4 text-3xl tracking-tighter text-zinc-600 sm:mb-5 sm:text-4xl dark:text-zinc-300">
        Hi, I&apos;m{" "}
        <span className="font-black text-green-700 dark:text-green-500">
          Akhila Ariyachandra
        </span>
      </h1>

      {!!about && <MDXComponent mdx={about.mdx} />}

      <ProfileStructuredData />
      <BreadcrumbStructuredData items={[{ name: "Home", route: "/" }]} />
    </>
  );
};

export default HomePage;
