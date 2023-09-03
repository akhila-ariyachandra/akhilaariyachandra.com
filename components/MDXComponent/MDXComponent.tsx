import ContentDisplay from "./ContentDisplay";
import { cn } from "@/lib/helpers";

type MDXComponentProps = {
  code: string;
};

const MDXComponent = ({ code }: MDXComponentProps) => {
  return (
    <div
      className={cn(
        "prose prose-sm prose-zinc max-w-none sm:prose-base", // Base styles
        "prose-headings:font-display", // Headings
        "prose-a:font-medium prose-a:text-green-700" // Links
      )}
    >
      <ContentDisplay code={code} />
    </div>
  );
};

export default MDXComponent;
