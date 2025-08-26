import React, { useEffect, useState } from "react";
import axios from "axios";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"; // wishlist icon
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"; // cart icon

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/furniture")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="px-8 py-12 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">
        Furniture Collection
      </h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden relative"
          >
            {/* Wishlist Button */}
            <button className="absolute top-3 right-3 bg-white rounded-full p-2 shadow hover:bg-red-100 transition">
              <FavoriteBorderIcon className="text-gray-600 hover:text-red-500" />
            </button>

            {/* Product Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-56 object-cover"
            />

            {/* Product Details */}
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-900">
                {item.name}
              </h3>
              <p className="text-sm text-gray-500 mb-2">{item.title}</p>
              <p className="text-gray-700 text-sm mb-3">{item.description}</p>

              {/* Price Section */}
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-gray-400 line-through text-sm">
                  ₹{item.price + 5000}
                </span>
                <span className="text-xl font-bold text-blue-600">
                  ₹{item.price}
                </span>
              </div>

              {/* Add to Cart Button */}
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl flex items-center justify-center gap-2 transition">
                <ShoppingCartIcon fontSize="small" />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
