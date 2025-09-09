// src/Pages/Products.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CircularProgress from "@mui/material/CircularProgress";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";

import { SearchContext } from "../Context/SearchContext";
import { CartContext } from "../Context/CartContext";
import { WishlistContext } from "../Context/WishlistContext";
import { ProductFilterContext } from "../Context/ProductFilterContext";

import NavBar from "../OpenUi/NavBar";
import QuickViewModal from '../components/QuickViewModal';

import { Listbox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/24/solid";

const categories = [
  "All",
  "Living",
  "Bedroom",
  "Dining",
  "Storage",
  "HomeDecor",
  "Kitchen",
];

const sortOptions = [
  { value: "", label: "Sort by" },
  { value: "low-high", label: "Price: Low → High" },
  { value: "high-low", label: "Price: High → Low" },
];

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

  const [visibleCount, setVisibleCount] = useState(8);
  const [scrollLoading, setScrollLoading] = useState(false);

  const [addingId, setAddingId] = useState(null);

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/furniture");
        setProducts(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter + search + sort
  useEffect(() => {
    let data = [...products];

    if (category !== "All") data = data.filter((p) => p.category === category);

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
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
        !scrollLoading &&
        visibleCount < filtered.length
      ) {
        setScrollLoading(true);
        setTimeout(() => {
          setVisibleCount((prev) => prev + 20);
          setScrollLoading(false);
        }, 1200);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollLoading, visibleCount, filtered.length]);

  const getDiscountInfo = (price) => {
    const mrp = price + 5000;
    const discount = Math.round(((mrp - price) / mrp) * 100);
    return { mrp, discount };
  };

  const handleAddToCart = (item) => {
    setAddingId(item.id);
    addToCart(item);
    setTimeout(() => setAddingId(null), 300);
  };

  return (
    <>
      <NavBar />
      <div className="px-6 py-12 bg-gray-50 min-h-screen mt-10">
        {/* Filter & Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">

          {/* Category Listbox */}
          <Listbox value={category} onChange={setCategory}>
            <div className="relative w-60">
              <Listbox.Button className="w-full rounded-lg border  bg-white px-4 py-2 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 flex justify-between items-center">
                {category}
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400 " />
              </Listbox.Button>
              <Listbox.Options className="absolute mt-1 w-full rounded-lg border bg-white shadow-lg z-10">
                {categories.map((cat, idx) => (
                  <Listbox.Option
                    key={idx}
                    value={cat}
                    className={({ active }) =>
                      `cursor-pointer px-4 py-2 ${
                        active ? "bg-gray-100 hover:bg-gray-300 text-gray-900" :  " text-gray-700"
                      }`
                    }
                  >
                    {cat}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>

          {/* Sort Order Listbox */}
          <Listbox value={sortOrder} onChange={setSortOrder}>
            <div className="relative w-60">
              <Listbox.Button className="w-full rounded-lg border bg-white px-4 py-2 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 flex justify-between items-center">
                {sortOptions.find((opt) => opt.value === sortOrder)?.label || "Sort by"}
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
              </Listbox.Button>
              <Listbox.Options className="absolute mt-1 w-full rounded-lg border bg-white shadow-lg z-10">
                {sortOptions.map((opt, idx) => (
                  <Listbox.Option
                    key={idx}
                    value={opt.value}
                    className={({ active }) =>
                      `cursor-pointer px-4 py-2 ${
                        active ? "bg-gray-100 text-gray-900 hover:bg-gray-300" : "text-gray-700"
                      }`
                    }
                  >
                    {opt.label}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>

        </div>

        {loading && (
          <div className="flex justify-center py-8">
            <CircularProgress />
          </div>
        )}

        {!loading && (
          <>
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
                {filtered.slice(0, visibleCount).map((item) => {
                  const { mrp, discount } = getDiscountInfo(item.price);
                  return (
                    <div
                      key={item.id}
                      className="relative group bg-white shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition overflow-hidden cursor-pointer"
                      onClick={() => setSelectedProduct(item)}
                    >
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-tr-lg rounded-bl-lg opacity-0 group-hover:opacity-100 transition">
                        {discount}% OFF
                      </div>

                      <FavoriteIcon
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(item);
                        }}
                        className={`absolute top-2 right-2 cursor-pointer transition-colors duration-200 z-10 ${
                          wishlist.find((p) => p.id === item.id)
                            ? "text-red-600"
                            : "text-red-300 hover:text-red-400"
                        }`}
                      />

                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-56 object-cover"
                      />

                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-600 truncate">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                          <p className="text-lg font-bold text-gray-500">
                            Rs. {item.price}
                          </p>
                          <p className="text-sm line-through text-gray-400">
                            Rs. {mrp}
                          </p>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(item);
                          }}
                          disabled={addingId === item.id}
                          className="mt-4 w-full bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 flex items-center justify-center gap-2"
                        >
                          {addingId === item.id ? (
                            <CircularProgress size={20} color="inherit" />
                          ) : (
                            <ShoppingCartIcon fontSize="small" />
                          )}
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
          <QuickViewModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            addToCart={handleAddToCart}
          />
        )}
      </div>
    </>
  );
};

export default Products;
