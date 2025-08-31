// Storage.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import { CartContext } from "../Context/CartContext";
import { WishlistContext } from "../Context/WishlistContext";
import NavBar from "../OpenUi/NavBar";
import { useNavigate } from "react-router-dom";

const Storage = () => {
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortOrder, setSortOrder] = useState("none");

  const [visibleCount, setVisibleCount] = useState(8);
  const [scrollLoading, setScrollLoading] = useState(false);

  // ✅ Only track which product is loading
  const [loadingProductId, setLoadingProductId] = useState(null);

  // Fetch Storage products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/furniture");
      const storageItems = res.data.filter((p) => p.category === "Storage");
      setProducts(storageItems);
    } catch (err) {
      console.error("Error fetching storage products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Infinite scroll
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

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === "low-high") return a.price - b.price;
    if (sortOrder === "high-low") return b.price - a.price;
    return 0;
  });

  // Calculate discount
  const calculateDiscount = (price) => {
    const originalPrice = price + 5000;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  // ✅ Handle Add to Cart -> Show loading -> Navigate to Cart
  const handleAddToCart = (item) => {
    setLoadingProductId(item.id);
    setTimeout(() => {
      addToCart(item);
      setLoadingProductId(null);
      navigate("/cart"); // ✅ Redirect to Cart page
    }, 1000); // simulate loading
  };

  return (
    <>
      <NavBar />

      <div className="px-6 py-12 bg-gray-50 min-h-screen relative mt-10">
        {/* Header + Sort */}
        <div className="flex justify-between items-center mb-6">
          <select
            className="border px-3 py-1 rounded-md"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="none">Sort By Price</option>
            <option value="low-high">Low to High</option>
            <option value="high-low">High to Low</option>
          </select>
        </div>

        {/* Loader */}
        {loading && (
          <div className="flex justify-center py-8">
            <CircularProgress />
          </div>
        )}

        {/* Product Grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedProducts.slice(0, visibleCount).map((item) => (
              <div
                key={item.id}
                className="relative bg-white rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300 cursor-pointer p-4 flex flex-col justify-between"
                onClick={() => setSelectedProduct(item)}
              >
                {/* Discount badge */}
                <div className="absolute bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-tr-lg rounded-bl-lg top-2 left-2 z-10">
                  {calculateDiscount(item.price)}% OFF
                </div>

                {/* Wishlist button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToWishlist(item);
                  }}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-red-100 z-10"
                >
                  <FavoriteBorderIcon className="text-gray-600 hover:text-red-500" />
                </button>

                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-48 object-cover rounded-lg mb-3"
                />

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 truncate">{item.title}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-gray-400 line-through text-sm">
                      ₹{item.price + 5000}
                    </span>
                    <span className="text-blue-600 font-bold">₹{item.price}</span>
                  </div>
                </div>

                {/* ✅ Add to Cart / Loading */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(item);
                  }}
                  className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2"
                  disabled={loadingProductId === item.id}
                >
                  {loadingProductId === item.id ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <>
                      <ShoppingCartIcon fontSize="small" />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}

        {scrollLoading && (
          <div className="flex justify-center py-6">
            <CircularProgress />
          </div>
        )}

        {/* Quick View Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white w-[90%] md:w-[70%] lg:w-[50%] rounded-2xl shadow-xl p-6 relative">
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
                onClick={() => setSelectedProduct(null)}
              >
                <CloseIcon />
              </button>
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  loading="lazy"
                  className="w-full md:w-1/2 h-80 object-cover rounded-xl"
                />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">{selectedProduct.name}</h2>
                  <p className="text-gray-500 mb-4">{selectedProduct.title}</p>
                  <p className="text-gray-700 mb-4">{selectedProduct.description}</p>
                  <div className="flex items-center space-x-3 mb-6">
                    <span className="text-gray-400 line-through">
                      ₹{selectedProduct.price + 5000}
                    </span>
                    <span className="text-2xl font-bold text-blue-600">
                      ₹{selectedProduct.price}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleAddToCart(selectedProduct)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl flex items-center justify-center gap-2"
                      disabled={loadingProductId === selectedProduct.id}
                    >
                      {loadingProductId === selectedProduct.id ? (
                        <CircularProgress size={22} color="inherit" />
                      ) : (
                        <>
                          <ShoppingCartIcon fontSize="small" />
                          Add to Cart
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => addToWishlist(selectedProduct)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-xl flex items-center justify-center gap-2"
                    >
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
    </>
  );
};

export default Storage;
