import MDXComponent from "@/components/MDXComponent";
import { about } from ".contentlayer/generated";

const HomePage = () => {
  return (
    <>
      <h1>
        Hi, I&apos;m <span>Akhila Ariyachandra</span>
      </h1>

      <MDXComponent code={about.body.code} />
    </>
  );
};

export default HomePage;
