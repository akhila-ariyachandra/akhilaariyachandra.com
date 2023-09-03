interface CodeSandboxWrapperProps {
  codeSandboxId: string;
}

const CodeSandboxWrapper = ({ codeSandboxId }: CodeSandboxWrapperProps) => {
  const idWords = codeSandboxId.split("-");
  const title = idWords.slice(0, idWords.length - 1).join("-");

  return (
    <div className="h-[500px]">
      <iframe
        src={`https://codesandbox.io/embed/${codeSandboxId}?autoresize=1&fontsize=14&hidenavigation=1&theme=dark`}
        title={title}
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        className="h-[500px] w-full overflow-hidden rounded border-0"
        loading="lazy"
      />
    </div>
  );
};

export default CodeSandboxWrapper;
