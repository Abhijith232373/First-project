import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";

// 👉 Contexts
import { SearchContext } from "../Context/SearchContext";
import { CartContext } from "../Context/CartContext";
import { WishlistContext } from "../Context/WishlistContext";
import { ProductFilterContext } from "../Context/ProductFilterContext";

import NavBar from "../OpenUi/NavBar";

const Products = () => {
  const { addToCart } = useContext(CartContext);
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const { category, setCategory, sortOrder, setSortOrder } =
    useContext(ProductFilterContext);
  const { query } = useContext(SearchContext);

  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartModal, setCartModal] = useState(null);

  const [visibleCount, setVisibleCount] = useState(8);
  const [scrollLoading, setScrollLoading] = useState(false);

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:3000/furniture");
        setProducts(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Apply filter + sort + search
  useEffect(() => {
    let data = [...products];

    if (category !== "All") {
      data = data.filter((p) => p.category === category);
    }

    if (query?.trim()) {
      const q = query.toLowerCase().trim();
      data = data.filter(
        (p) =>
          (p.name && p.name.toLowerCase().includes(q)) ||
          (p.title && p.title.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }

    if (sortOrder === "low-high") data.sort((a, b) => a.price - b.price);
    if (sortOrder === "high-low") data.sort((a, b) => b.price - a.price);

    setFiltered(data);
    setVisibleCount(8);
  }, [category, products, sortOrder, query]);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        !scrollLoading &&
        visibleCount < filtered.length
      ) {
        setScrollLoading(true);
        setTimeout(() => {
          setVisibleCount((prev) => prev + 10);
          setScrollLoading(false);
        }, 1200);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollLoading, visibleCount, filtered.length]);

  // Helper: Discount info
  const getDiscountInfo = (price) => {
    const mrp = price + 5000;
    const discount = Math.round(((mrp - price) / mrp) * 100);
    return { mrp, discount };
  };

  return (
    <>
      <NavBar />
      <div className="px-6 py-12 bg-gray-50 min-h-screen mt-10">
        {/* <h2 className="text-4xl font-extrabold mb-6 text-center text-gray-800">
          ✨ Furniture Collection ✨
        </h2> */}

        {/* Filter & Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded-lg px-4 py-2 shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">✨ All</option>
            <option value="Living">🛋️ Living</option>
            <option value="Bedroom">🛏️ Bedroom</option>
            <option value="Dining">🍽️ Dining</option>
            <option value="Storage">📦 Storage</option>
            <option value="Homedecor">📦 HomeDecor</option>
            <option value="Kitchen">📦 Kitchen</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border rounded-lg px-4 py-2 shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Sort by</option>
            <option value="low-high">Price: Low → High</option>
            <option value="high-low">Price: High → Low</option>
          </select>
        </div>

        {loading && (
          <div className="flex justify-center py-8">
            <CircularProgress />
          </div>
        )}

        {!loading && (
          <>
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filtered.slice(0, visibleCount).map((item) => {
                  const { mrp, discount } = getDiscountInfo(item.price);
                  return (
                    <div
                      key={item.id}
                      className="relative group bg-white rounded-2xl shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition overflow-hidden cursor-pointer"
                      onClick={() => setSelectedProduct(item)}
                    >
                      {/* Discount badge on hover */}
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-tr-lg rounded-bl-lg opacity-0 group-hover:opacity-100 transition">
                        {discount}% OFF
                      </div>

                      {/* Wishlist */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(item);
                        }}
                        className={`absolute top-2 right-2 rounded-full p-2 shadow transition z-10 ${
                          wishlist.find((p) => p.id === item.id)
                            ? "bg-red-100"
                            : "bg-white"
                        }`}
                      >
                        <FavoriteBorderIcon
                          className={`${
                            wishlist.find((p) => p.id === item.id)
                              ? "text-red-500"
                              : "text-gray-600"
                          }`}
                        />
                      </button>

                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-56 object-cover"
                      />

                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                          <p className="text-xl font-bold text-blue-600">
                            ₹{item.price}
                          </p>
                          <p className="text-sm line-through text-gray-400">₹{mrp}</p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(item);
                          }}
                          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2"
                        >
                          <ShoppingCartIcon fontSize="small" />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                No products found {query ? `for "${query}"` : ""}
              </div>
            )}
          </>
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
                  className="w-full md:w-1/2 h-80 object-cover rounded-xl"
                />

                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">
                    {selectedProduct.name}
                  </h2>
                  <p className="text-gray-500 mb-4">{selectedProduct.title}</p>
                  <p className="text-gray-700 mb-4">
                    {selectedProduct.description}
                  </p>

                  {(() => {
                    const { mrp, discount } = getDiscountInfo(
                      selectedProduct.price
                    );
                    return (
                      <div className="flex items-center gap-3 mb-6">
                        <span className="text-gray-400 line-through">₹{mrp}</span>
                        <span className="text-2xl font-bold text-blue-600">
                          ₹{selectedProduct.price}
                        </span>
                        <span className="text-green-600 font-semibold">
                          {discount}% OFF
                        </span>
                      </div>
                    );
                  })()}

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        addToCart(selectedProduct);
                        setCartModal(selectedProduct);
                        setSelectedProduct(null);
                      }}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition"
                    >
                      <ShoppingCartIcon fontSize="small" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => toggleWishlist(selectedProduct)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition"
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

        {/* Add to Cart Confirmation */}
        {cartModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-lg w-[90%] md:w-[400px] p-6 relative">
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
                onClick={() => setCartModal(null)}
              >
                <CloseIcon />
              </button>
              <div className="flex flex-col items-center text-center">
                <img
                  src={cartModal.image}
                  alt={cartModal.name}
                  className="w-32 h-32 object-cover rounded-xl mb-4"
                />
                <h3 className="text-lg font-semibold mb-2">
                  {cartModal.name} added to cart ✅
                </h3>
                <p className="text-gray-500 mb-4">
                  You can continue shopping or go to your cart.
                </p>
                <div className="flex gap-4 w-full">
                  <button
                    onClick={() => setCartModal(null)}
                    className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
                  >
                    Continue Shopping
                  </button>
                  <button
                    onClick={() => (window.location.href = "/cart")}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Go to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
