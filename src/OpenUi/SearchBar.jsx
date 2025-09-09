// src/components/SearchBar.jsx
import React, { useContext, useState } from "react";
import { SearchContext } from '../Context/SearchContext';
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const { query, setQuery, products } = useContext(SearchContext);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (product) => {
    setQuery("");
    setShowResults(false);
    // 👇 redirect to category page (change to /product/:id if needed)
    navigate(`/category/${product.category}`);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        value={query}
        placeholder="Search furniture..."
        className="w-full border rounded-lg p-2"
        onChange={(e) => {
          setQuery(e.target.value);
          setShowResults(true);
        }}
        onBlur={() => setTimeout(() => setShowResults(false), 200)}
      />

      {showResults && query && (
        <ul className="absolute w-full bg-white shadow-lg rounded-lg mt-1 z-50 max-h-60 overflow-y-auto">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <li
                key={product.id}
                onClick={() => handleSelect(product)}
                className="flex items-center gap-3 p-2 hover:bg-gray-200 cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <span>{product.name}</span>
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
