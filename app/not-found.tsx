import Link from "next/link";
import Title from "@/components/Title";

const NotFound = () => {
  return (
    <>
      <Title>Not Found</Title>

      <p className="text-sm text-zinc-700 sm:text-base">
        {"You have reached a route that does't exist. "}
        <Link href="/" className="font-medium text-green-700 hover:underline">
          Return Home
        </Link>
      </p>
    </>
  );
};

export default NotFound;
