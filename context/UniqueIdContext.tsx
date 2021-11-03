import React from "react";
import { nanoid } from "nanoid";

const KEY = "aa/unique-id";

export const UniqueIdContext = React.createContext(null);

export const UniqueIdProvider: React.FunctionComponent = ({ children }) => {
  const [uniqueId, setUniqueId] = React.useState<string>();

  React.useEffect(() => {
    // Check if unique ID already exists in localstorage
    if (localStorage.getItem(KEY)) {
      setUniqueId(localStorage.getItem(KEY));
    } else {
      // Or generate a new one
      const newId = nanoid();
      setUniqueId(newId);
    }
  }, []);

  // Save to localstorage
  React.useEffect(() => {
    // Don't try to save if uuid is null
    if (!uniqueId) {
      return;
    }

    localStorage.setItem(KEY, uniqueId);
  }, [uniqueId]);

  return (
    <UniqueIdContext.Provider value={uniqueId}>
      {children}
    </UniqueIdContext.Provider>
  );
};
