import SEO from "components/SEO";

const Index = () => {
  return (
    <div className="container grid place-content-center mx-auto max-w-screen-md min-h-screen">
      <h1 className="text-center text-gray-800 text-3xl font-medium leading-snug">
        Open Graph Image generator for{" "}
        <a
          className="text-green-700"
          href="https://akhilaariyachandra.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          akhilaariyachandra.com
        </a>
      </h1>

      <SEO />
    </div>
  );
};

export default Index;
