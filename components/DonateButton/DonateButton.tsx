import icon from "./icon.webp";
import Image from "next/image";

const DonateButton = () => {
  return (
    <a
      href="https://www.buymeacoffee.com/aariyachank"
      target="_blank"
      rel="noopener noreferrer"
      className="mx-auto mb-5 mt-9 flex max-w-max flex-row items-center overflow-hidden rounded bg-[#fedc00] py-1 pr-2 sm:mb-6 sm:mt-10 sm:rounded-md"
    >
      <Image
        src={icon}
        alt="Buy Me a Coffee icon"
        width={40}
        height={40}
        placeholder="blur"
        className="h-9 w-9 sm:h-10 sm:w-10"
      />

      <span className="text-lg font-semibold tracking-tighter text-[#12101c] sm:text-xl">
        Buy Me a Coffee
      </span>
    </a>
  );
};

export default DonateButton;
