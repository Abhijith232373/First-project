import React, { useContext, useState } from "react";
import { SearchContext } from "../Context/SearchContext";
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';

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
    navigate(`/product/${product.id}`);
  };

  return (
<div className="relative w-full">
  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 " />
  <input
    type="text"
    value={query}
    placeholder="Search furniture..."
 className="w-full border rounded-lg p-2 pl-10 focus:outline-none focus:ring-0 focus:border-gray-300" 
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
                onMouseDown={() => handleSelect(product)}
                className="flex items-center gap-3 p-2 hover:bg-gray-200 cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-10 h-10 object-cover rounded-4xl"
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
