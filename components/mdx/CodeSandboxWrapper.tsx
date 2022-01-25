import React from "react";
import LazyLoad from "react-lazyload";

const IFRAME_HEIGHT = 500;

type Props = {
  codeSandboxId: string;
};

const CodeSandboxWrapper: React.FunctionComponent<Props> = ({
  codeSandboxId,
}) => {
  const idWords = codeSandboxId.split("-");
  const title = idWords.slice(0, idWords.length - 1).join("-");

  return (
    <div className="my-4">
      <LazyLoad height={IFRAME_HEIGHT} offset={500} once>
        <iframe
          src={`https://codesandbox.io/embed/${codeSandboxId}?autoresize=1&fontsize=14&hidenavigation=1&theme=dark`}
          title={title}
          allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
          className="h-[500px] w-full overflow-hidden rounded border-0"
        />
      </LazyLoad>
    </div>
  );
};

export default CodeSandboxWrapper;
