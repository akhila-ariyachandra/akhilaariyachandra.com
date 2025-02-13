type CodeSandboxWrapperProps = {
  codeSandboxId: string;
};

const CodeSandboxWrapper = ({ codeSandboxId }: CodeSandboxWrapperProps) => {
  const idWords = codeSandboxId.split("-");
  const title = idWords.slice(0, idWords.length - 1).join("-");

  return (
    <div className="my-4 h-[500px] overflow-hidden rounded-sm sm:my-5 sm:rounded-md">
      <iframe
        src={`https://codesandbox.io/embed/${codeSandboxId}?autoresize=1&fontsize=14&hidenavigation=1&theme=dark`}
        title={title}
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        // eslint-disable-next-line @eslint-react/dom/no-unsafe-iframe-sandbox
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        className="h-[500px] w-full overflow-hidden rounded-sm border-0"
        loading="lazy"
      />
    </div>
  );
};

export default CodeSandboxWrapper;
