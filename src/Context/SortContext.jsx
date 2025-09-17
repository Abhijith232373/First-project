import { createContext, useState } from "react";

export const SortContext = createContext();
export const SortProvider = ({ children }) => {
  const [sortType, setSortType] = useState("");

  return (
    <SortContext.Provider value={{ sortType, setSortType }}>
      {children}
    </SortContext.Provider>
  );
};
