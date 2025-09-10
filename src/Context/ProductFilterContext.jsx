import { createContext, useState } from "react";

export const ProductFilterContext = createContext();

export const ProductFilterProvider = ({ children }) => {
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState(""); 

  return (
    <ProductFilterContext.Provider
      value={{ category, setCategory, sortOrder, setSortOrder }}
    >
      {children}
    </ProductFilterContext.Provider>
  );
};
