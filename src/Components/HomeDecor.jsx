// src/Pages/HomeDecorProducts.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { useNavigate } from "react-router-dom";

// 👉 Contexts
import { CartContext } from "../Context/CartContext";
import { WishlistContext } from "../Context/WishlistContext";
import { ProductFilterContext } from "../Context/ProductFilterContext";

import NavBar from "../OpenUi/NavBar";

const HomeDecor = () => {
  const { addToCart } = useContext(CartContext);
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const { sortOrder, setSortOrder } = useContext(ProductFilterContext);

  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartModal, setCartModal] = useState(null);

  const [visibleCount, setVisibleCount] = useState(8);
  const [scrollLoading, setScrollLoading] = useState(false);

  const [addingId, setAddingId] = useState(null);
  const navigate = useNavigate();

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/furniture");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter HomeDecor + sort
  useEffect(() => {
    let data = products.filter((p) => p.category === "HomeDecor");

    if (sortOrder === "low-high") data.sort((a, b) => a.price - b.price);
    if (sortOrder === "high-low") data.sort((a, b) => b.price - a.price);

    setFiltered(data);
    setVisibleCount(8);
  }, [products, sortOrder]);

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

  // Discount helper
  const getDiscountInfo = (price) => {
    const mrp = price + 5000;
    const discount = Math.round(((mrp - price) / mrp) * 100);
    return { mrp, discount };
  };

  // Add to cart
  const handleAddToCart = (e, item) => {
    e.stopPropagation();
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      window.location.href = "/user";
      return;
    }
    setAddingId(item.id);
    addToCart(item);
    setTimeout(() => {
      setAddingId(null);
      navigate("/cart");
    }, 1000);
  };

  return (
    <>
      <NavBar />
      <div className="px-6 py-12 bg-gray-50 min-h-screen mt-10">
        <div className="flex justify-end mb-8">
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
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-tr-lg rounded-bl-lg opacity-0 group-hover:opacity-100 transition">
                        {discount}% OFF
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(item);
                        }}
                        className={`absolute top-2 right-2 rounded-full p-2 shadow transition z-10 ${
                          wishlist.find((p) => p.id === item.id)
                            ? "bg-red-400"
                            : "bg-white"
                        }`}
                      >
                        <FavoriteBorderIcon
                          className={`${
                            wishlist.find((p) => p.id === item.id)
                              ? "text-red-500"
                              : "text-gray-800"
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
                          <p className="text-sm line-through text-gray-400">
                            ₹{mrp}
                          </p>
                        </div>

                        <button
                          onClick={(e) => handleAddToCart(e, item)}
                          disabled={addingId === item.id}
                          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2"
                        >
                          {addingId === item.id ? (
                            <CircularProgress size={20} color="inherit" />
                          ) : (
                            <>
                              <ShoppingCartIcon fontSize="small" />
                              Add to Cart
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                No HomeDecor products found.
              </div>
            )}
          </>
        )}

        {scrollLoading && (
          <div className="flex justify-center py-6">
            <CircularProgress />
          </div>
        )}
      </div>
    </>
  );
};

export default HomeDecor;
