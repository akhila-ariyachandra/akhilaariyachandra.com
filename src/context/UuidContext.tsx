import React from "react";
import short from "short-uuid";

const KEY = "aa/unique-id";

export const UuidContext = React.createContext(null);

export const UuidProvider: React.FunctionComponent = ({ children }) => {
  const [uuid, setUuid] = React.useState<string>();

  React.useEffect(() => {
    // Check if unique ID already exists in localstorage
    if (localStorage.getItem(KEY)) {
      setUuid(localStorage.getItem(KEY));
    } else {
      // Or generate a new one
      const newId = short().new();
      setUuid(newId);
    }
  }, []);

  // Save to localstorage
  React.useEffect(() => {
    // Don't try to save if uuid is null
    if (!uuid) {
      return;
    }

    localStorage.setItem(KEY, uuid);
  }, [uuid]);

  return <UuidContext.Provider value={uuid}>{children}</UuidContext.Provider>;
};
