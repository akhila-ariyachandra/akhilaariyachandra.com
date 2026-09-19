import { cn } from "cn";
import { type ComponentProps } from "react";

const TypographyWrapper = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "prose prose-sm max-w-none font-medium text-black sm:prose-base dark:text-white", // Base styles
        "prose-headings:text-black dark:prose-headings:text-white", // Headings (and table header cells)
        "prose-strong:text-black dark:prose-strong:text-white", // Bold text
        "prose-code:text-black dark:prose-code:text-white", // Inline code
        "prose-kbd:text-black dark:prose-kbd:text-white", // Keyboard input
        "prose-blockquote:text-black dark:prose-blockquote:text-white", // Blockquotes
        "prose-a:font-semibold prose-a:text-accent prose-a:no-underline prose-a:hover:underline dark:prose-a:text-accent-dark", // Links
        "marker:text-black dark:marker:text-white", // list bullets/numbers
        className,
      )}
      {...props}
    />
  );
};

export default TypographyWrapper;
