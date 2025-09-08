// src/context/SearchContext.jsx
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/furniture")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <SearchContext.Provider value={{ query, setQuery, products }}>
      {children}
    </SearchContext.Provider>
  );
};
