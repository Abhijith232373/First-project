import React, { useState, useEffect, useContext } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import { CartContext } from "../Context/CartContext";
import { AuthContext } from "../Pages/AuthContext";
import { WishlistContext } from "../Context/WishlistContext";
import { SearchContext } from "../Context/SearchContext"; // ⬅ new search context
import { Link } from "react-router-dom";

const NavBar = () => {
  const { wishlist } = useContext(WishlistContext);
  const { cart } = useContext(CartContext);
  const { isLoggedIn, logout } = useContext(AuthContext);
  const { query, setQuery } = useContext(SearchContext); // ⬅ use search context

  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const NavStyle = `relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] 
    after:bg-black after:transition-all after:duration-400 hover:after:w-full hover:cursor-pointer`;

  // hide/show navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div>
      <nav
        className={`fixed top-0 left-0 w-full flex flex-wrap justify-between items-center px-6 bg-amber-50 h-16 font-serif rounded-b-lg shadow-md transition-transform duration-300 z-50 ${
          showNav ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Left Links */}
        <div className="flex space-x-6">
          <div className={NavStyle}>Dummy</div>
          <Link to="/products">
            <div className={NavStyle}>Shop All</div>
          </Link>
          <Link to="/living">
            <div className={NavStyle}>Living</div>
          </Link>
          <Link to="/dining">
            <div className={NavStyle}>Dining</div>
          </Link>
          <div className={NavStyle}>Bedroom</div>
          <Link to="/storage">
            <div className={NavStyle}>Storage</div>
          </Link>
          <div className={NavStyle}>HomeDecor</div>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)} // ⬅ store in context
          className="px-3 py-1 rounded-lg outline-none border focus:ring-2 focus:ring-blue-600 mt-2 md:mt-0 w-full md:w-60"
        />

        {/* Right Icons */}
        <div className="flex items-center gap-5 mt-2 md:mt-0 relative">
          {/* Show User Icon only if NOT logged in */}
          {!isLoggedIn && (
            <Link to="/user">
              <img
                src="src/assets/Navbar/user.svg"
                alt="user"
                className="w-6 h-6"
              />
            </Link>
          )}

          {/* Cart */}
          <Link to="/cart" className="relative">
            <ShoppingCartIcon className="text-gray-700 w-6 h-6" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </Link>

          {/* Wishlist */}
          <Link to="/wishlist" className="relative">
            <FavoriteBorderIcon className="text-gray-700 w-6 h-6" />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Show Logout only if logged in */}
          {isLoggedIn && (
            <LogoutIcon
              onClick={logout}
              className="cursor-pointer text-gray-700 w-6 h-6"
            />
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
