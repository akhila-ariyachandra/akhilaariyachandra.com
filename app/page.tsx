import profilePic from "@/public/profile-pic.png";
import Image from "next/image";
import MDXComponent from "@/components/MDXComponent";
import { about } from ".contentlayer/generated";

const HomePage = () => {
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

      <h1 className="mb-4 font-display text-3xl text-zinc-600 sm:mb-5 sm:text-4xl">
        Hi, I&apos;m{" "}
        <span className="font-black text-green-700">Akhila Ariyachandra</span>
      </h1>

      <MDXComponent code={about.body.code} />
    </>
  );
};

export default HomePage;
