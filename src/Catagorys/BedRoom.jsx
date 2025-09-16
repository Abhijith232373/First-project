import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CircularProgress from "@mui/material/CircularProgress";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { SearchContext } from "../Context/SearchContext";
import { CartContext } from "../Context/CartContext";
import { WishlistContext } from "../Context/WishlistContext";
import { ProductFilterContext } from "../Context/ProductFilterContext";
import NavBar from "../OpenUi/NavBar";
import QuickViewModal from "../Pages/QuickViewModal";
import { Listbox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/24/solid";
import ProductSkeleton from "../Animations/ProductSkeleton";

const sortOptions = [
  { value: "", label: "Sort by" },
  { value: "low-high", label: "Price: Low → High" },
  { value: "high-low", label: "Price: High → Low" },
];

const Bedroom = () => {
  const { addToCart } = useContext(CartContext);
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const { sortOrder, setSortOrder } = useContext(ProductFilterContext);
  const { query } = useContext(SearchContext);

  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [visibleCount, setVisibleCount] = useState(8);
  const [scrollLoading, setScrollLoading] = useState(false);

  const [addingId, setAddingId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const startTime = Date.now();
      try {
        const res = await axios.get("http://localhost:5000/furniture");
        const bedroomProducts = res.data.filter((p) => p.category === "Bedroom");
        setProducts(bedroomProducts);
        setFiltered(bedroomProducts);
      } catch (err) {
        console.error(err);
      } finally {
        const elapsed = Date.now() - startTime;
        const delay = Math.max(1500 - elapsed, 0);
        setTimeout(() => setLoading(false), delay);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let data = [...products];

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
  }, [products, sortOrder, query]);

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
    if (!item.stock) return; // prevent adding out-of-stock items
    setAddingId(item.id);
    addToCart(item);
    setTimeout(() => setAddingId(null), 300);
  };

  return (
    <>
      <NavBar />
      <div className="px-6 py-12 bg-gray-50 min-h-screen mt-10">
        {/* Sort dropdown */}
              <div className="flex justify-end items-center mb-8">
                 <Listbox value={sortOrder} onChange={setSortOrder}>
                   <div className="relative w-40">
                     <Listbox.Button className="w-full rounded-md border bg-white px-3 py-2 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 flex justify-between items-center text-sm">
                       {sortOptions.find((opt) => opt.value === sortOrder)?.label || "Sort by"}
                       <ChevronUpDownIcon className="h-4 w-4 text-gray-400" />
                     </Listbox.Button>
                     <Listbox.Options className="absolute mt-1 w-full rounded-md border bg-white shadow-lg z-10 text-sm">
                       {sortOptions.map((opt, idx) => (
                         <Listbox.Option
                           key={idx}
                           value={opt.value}
                           className={({ active }) =>
                             `cursor-pointer px-3 py-2 ${
                               active
                                 ? "bg-gray-100 text-gray-900 hover:bg-gray-200"
                                 : "text-gray-700"
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
        {/* Skeleton loader */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Products */}
        {!loading && (
          <>
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {filtered.slice(0, visibleCount).map((item) => {
                  const { mrp, discount } = getDiscountInfo(item.price);
                  const isOutOfStock = item.stock === false;

                  return (
                    <div
                      key={item.id}
                      className={`relative group bg-white shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition overflow-hidden ${
                        isOutOfStock ? "opacity-70 cursor-progress" : "cursor-pointer"
                      }`}
                      onClick={() => !isOutOfStock && setSelectedProduct(item)}
                    >
                      {/* Discount badge */}
                      {!isOutOfStock && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-tr-lg rounded-bl-lg opacity-0 group-hover:opacity-100 transition">
                          {discount}% OFF
                        </div>
                      )}

                      {/* Stock Out overlay */}
                     {isOutOfStock && (
                        <div className="absolute inset-0  bg-opacity-100 flex items-center justify-center">
                          <span className="rounded text-white text-lg font-bold bg-gray-500 px-26 hover:scale-105 transition ease-in-out">STOCK OUT</span>
                        </div>
                      )}

                      {/* Wishlist button */}
                      {!isOutOfStock && (
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
                      )}

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
                          disabled={isOutOfStock || addingId === item.id}
                          className={`mt-4 w-full py-2 px-4 flex items-center justify-center gap-2 ${
                            isOutOfStock
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : "bg-gray-500 hover:bg-gray-700 text-white"
                          }`}
                        >
                          {addingId === item.id ? (
                            <CircularProgress size={20} color="inherit" />
                          ) : (
                            <>
                              <ShoppingCartIcon fontSize="small" />
                              {isOutOfStock ? "Unavailable" : "Add to Cart"}
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
                No products found {query ? `for "${query}"` : ""}
              </div>
            )}
          </>
        )}

        {/* Infinite scroll loader */}
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

export default Bedroom;
