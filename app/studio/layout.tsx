import StyledComponentsRegistry from "./registry";

const StudioLayout = ({ children }: LayoutProps<"/studio">) => {
  return (
    <html>
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
};

export default StudioLayout;
