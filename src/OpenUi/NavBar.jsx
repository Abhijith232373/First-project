// src/OpenUi/NavBar.jsx
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import { CartContext } from "../Context/CartContext";
import { AuthContext } from "../Context/AuthContext";
import { WishlistContext } from "../Context/WishlistContext";
import { SearchContext } from "../context/SearchContext";
import toast from "react-hot-toast"; // ✅ Toast for alerts
import SearchBar from "./SearchBar";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const NavBar = () => {
  const { wishlist } = useContext(WishlistContext);
  const { cart } = useContext(CartContext);
  const { isLoggedIn, logout } = useContext(AuthContext);
  const { query, setQuery } = useContext(SearchContext);

  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  // Active link underline
  const NavStyle = (path) =>
    `relative inline-block px-2 py-1 text-[15px] after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] 
     after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full hover:text-blue-600 hover:cursor-pointer ${
       location.pathname === path ? "text-blue-600 font-semibold after:w-full" : "text-gray-700"
     }`;

  // hide/show navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) setShowNav(false);
      else setShowNav(true);
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // handle search enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate("/products");
    }
  };

  // handle logout with toast
  const handleLogout = () => {
    logout();
    toast.error("Logged out");
    navigate("/"); // redirect home
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex justify-between items-center px-6 bg-white h-16 shadow-md transition-transform duration-300 z-50 ${
        showNav ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* LEFT: Logo */}
      <div className="flex items-center gap-6">
        <Link to="/">
          <img
            src="src/assets/logo/Home4u-logo-transparent.png"
            alt="Home4U Logo"
            className="h-12 w-auto object-contain" // ✅ fixed Tailwind size
          />
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/products">
            <div className={NavStyle("/products")}>Shop All</div>
          </Link>
          <Link to="/living">
            <div className={NavStyle("/living")}>Living</div>
          </Link>
          <Link to="/dining">
            <div className={NavStyle("/dining")}>Dining</div>
          </Link>
          <Link to="/bedroom">
            <div className={NavStyle("/bedroom")}>Bedroom</div>
          </Link>
          <Link to="/storage">
            <div className={NavStyle("/storage")}>Storage</div>
          </Link>
          <Link to="/homedecor">
            <div className={NavStyle("/homedecor")}>Home Decor</div>
          </Link>
          <Link to="/kitchen">
            <div className={NavStyle("/kitchen")}>Kitchen</div>
          </Link>
        </div>
      </div>

      {/* RIGHT: Search + Icons */}
      <div className="flex items-center gap-5">
        {/* Search */}
        {/* <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="px-3 py-1 rounded-lg outline-none border focus:ring-1 hidden md:block w-60"
        /> */}

          <SearchBar/>

        {/* User Login */}
        {!isLoggedIn && (
          <Link to="/user">
            <AccountCircleIcon
              className="w-12 h-6 text-gray-600"
            />
          </Link>
        )}


        
          {/* <div></div> */}
        {/* Cart */}
        <Link to="/cart" className="relative">
          <ShoppingCartIcon className="text-gray-600 w-6 h-6" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </span>
          )}
        </Link>

        {/* Wishlist */}
        <Link to="/wishlist" className="relative">
          <FavoriteBorderIcon className="text-gray-600 w-6 h-6" />
          {wishlist.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
              {wishlist.length}
            </span>
          )}
        </Link>

        {/* Logout */}
        {isLoggedIn && (
          <LogoutIcon
            onClick={handleLogout}
            className="cursor-pointer text-gray-600 w-6 h-6"
          />
        )}
      </div>
    </nav>
  );
};

export default NavBar;
