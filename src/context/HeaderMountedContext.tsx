import React from "react";

export const HeaderMountedContext = React.createContext(false);

export const HeaderMounterProvider: React.FunctionComponent = ({
  children,
}) => {
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <HeaderMountedContext.Provider value={hasMounted}>
      {children}
    </HeaderMountedContext.Provider>
  );
};
