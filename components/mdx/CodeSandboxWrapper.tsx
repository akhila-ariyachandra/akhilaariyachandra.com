import React from "react";
import { CodeSandbox } from "mdx-embed";

type Props = {
  codeSandboxId: string;
};

const CodeSandboxWrapper: React.FunctionComponent<Props> = ({
  codeSandboxId,
}) => {
  return (
    <div className="my-4">
      <CodeSandbox codeSandboxId={codeSandboxId} />
    </div>
  );
};

export default CodeSandboxWrapper;
