import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedMode, setSelectedMode] = useState("chat");

  return (
    <AppContext.Provider value={{ selectedMode, setSelectedMode }}>
      {children}
    </AppContext.Provider>
  );
};
