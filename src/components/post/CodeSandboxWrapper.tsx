import React from "react";
import dynamic from "next/dynamic";
const CodeSandbox = dynamic(() =>
  import("mdx-embed").then((mod) => mod.CodeSandbox)
);

type Props = {
  codeSandboxId: string;
};

const CodeSandboxWrapper: React.FunctionComponent<Props> = ({
  codeSandboxId,
}) => {
  return (
    <div className="full-bleed my-4">
      <CodeSandbox codeSandboxId={codeSandboxId} />
    </div>
  );
};

export default CodeSandboxWrapper;
