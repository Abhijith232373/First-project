import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import { CartContext } from "./CartContext";

const Dining = () => {
  const { addToCart } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Infinite Scroll states
  const [visibleCount, setVisibleCount] = useState(8);
  const [scrollLoading, setScrollLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/furniture");
      // 👉 Only Dining products
      const diningItems = res.data.filter((p) => p.category === "Dining");
      setProducts(diningItems);
    } catch (err) {
      console.error("Error fetching dining products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 👉 Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
        !scrollLoading &&
        visibleCount < products.length
      ) {
        setScrollLoading(true);
        setTimeout(() => {
          setVisibleCount((prev) => prev + 10);
          setScrollLoading(false);
        }, 1500);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollLoading, visibleCount, products.length]);

  return (
    <div className="px-6 py-12 bg-gray-50 min-h-screen relative mt-24">
      <h2 className="text-4xl font-extrabold mb-6 text-center text-gray-800">
        🍽 Dining Collection
      </h2>

      {/* Loader */}
      {loading && (
        <div className="flex justify-center py-8">
          <CircularProgress />
        </div>
      )}

      {/* Dining Product Grid */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(0, visibleCount).map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 overflow-hidden relative cursor-pointer"
              onClick={() => setSelectedProduct(item)}
            >
              {/* Wishlist */}
              <button className="absolute top-3 right-3 bg-white rounded-full p-2 shadow hover:bg-red-100 transition">
                <FavoriteBorderIcon className="text-gray-600 hover:text-red-500" />
              </button>

              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-56 object-cover"
              />

              {/* Details */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500 mb-2 truncate">
                  {item.title}
                </p>
                <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                  {item.description}
                </p>

                {/* Price */}
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-gray-400 line-through text-sm">
                    ₹{item.price + 5000}
                  </span>
                  <span className="text-xl font-bold text-blue-600">
                    ₹{item.price}
                  </span>
                </div>

                {/* Cart Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(item);
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl flex items-center justify-center gap-2 transition"
                >
                  <ShoppingCartIcon fontSize="small" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Infinite Scroll Loader */}
      {scrollLoading && (
        <div className="flex justify-center py-6">
          <CircularProgress />
        </div>
      )}

      {/* Dining Quick View Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] md:w-[70%] lg:w-[50%] rounded-2xl shadow-xl p-6 relative">
            {/* Close */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
              onClick={() => setSelectedProduct(null)}
            >
              <CloseIcon />
            </button>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Image */}
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full md:w-1/2 h-80 object-cover rounded-xl"
              />

              {/* Info */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">
                  {selectedProduct.name}
                </h2>
                <p className="text-gray-500 mb-4">{selectedProduct.title}</p>
                <p className="text-gray-700 mb-4">
                  {selectedProduct.description}
                </p>

                <div className="flex items-center space-x-3 mb-6">
                  <span className="text-gray-400 line-through">
                    ₹{selectedProduct.price + 5000}
                  </span>
                  <span className="text-2xl font-bold text-blue-600">
                    ₹{selectedProduct.price}
                  </span>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => addToCart(selectedProduct)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition"
                  >
                    <ShoppingCartIcon fontSize="small" />
                    Add to Cart
                  </button>

                  <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition">
                    <FavoriteBorderIcon fontSize="small" />
                    Add to Wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dining;
